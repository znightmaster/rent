import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import type { BookingResponse } from '#shared/types'
import { isISODate, nightsBetween, todayISO } from '#shared/utils/date'
import type { StoredBooking } from '../utils/bookings'

const MAX_NIGHTS = 60

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Некорректное время')

const bookingSchema = z.object({
  apartmentId: z.union([z.string(), z.number()]).transform(String),
  name: z.string().trim().min(2, 'Укажите имя').max(100, 'Слишком длинное имя'),
  phone: z
    .string()
    .trim()
    .transform((s) => s.replace(/[^\d+]/g, ''))
    .pipe(z.string().regex(/^\+?\d{10,15}$/, 'Укажите корректный номер телефона')),
  email: z
    .string()
    .trim()
    .refine((v) => v === '' || z.string().email().safeParse(v).success, 'Укажите корректный e-mail')
    .optional()
    .default(''),
  guests: z.coerce.number().int().min(1, 'Укажите количество гостей').max(20),
  from: z.string().refine(isISODate, 'Укажите дату заезда'),
  to: z.string().refine(isISODate, 'Укажите дату выезда'),
  checkInTime: timeSchema.optional().default('14:00'),
  checkOutTime: timeSchema.optional().default('12:00'),
  comment: z.string().trim().max(1000, 'Комментарий слишком длинный').optional().default(''),
  consent: z.literal(true, { errorMap: () => ({ message: 'Необходимо согласие с условиями' }) }),
  website: z.string().optional(), // honeypot
})

export default defineEventHandler(async (event): Promise<BookingResponse> => {
  rateLimit(event, { key: 'bookings', limit: 5, windowMs: 60_000 })

  const parsed = bookingSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: parsed.error.issues[0]?.message ?? 'Проверьте данные формы',
      data: { fields: Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message])) },
    })
  }
  const input = parsed.data

  // Бот заполнил скрытое поле — делаем вид, что всё хорошо, но ничего не сохраняем
  if (input.website) return { id: 'ok', status: 'new', nights: 0, total: 0 }

  const apartment = await getApartmentById(input.apartmentId)
  if (!apartment) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Апартаменты не найдены' })
  }
  if (input.guests > apartment.tenantLimit) {
    throw createError({ statusCode: 400, message: `Максимум гостей в этой квартире: ${apartment.tenantLimit}` })
  }
  if (input.from < todayISO()) {
    throw createError({ statusCode: 400, message: 'Дата заезда не может быть в прошлом' })
  }
  const nights = nightsBetween(input.from, input.to)
  if (nights < 1) {
    throw createError({ statusCode: 400, message: 'Дата выезда должна быть позже даты заезда' })
  }
  if (nights > MAX_NIGHTS) {
    throw createError({ statusCode: 400, message: `Максимальный срок онлайн-бронирования — ${MAX_NIGHTS} ночей` })
  }

  // Проверка занятости и сохранение — под одной блокировкой, чтобы не продать одни даты дважды
  const booking = await withBookingLock(async () => {
    if (await hasOverlap(apartment.id, input.from, input.to)) {
      throw createError({ statusCode: 409, message: 'На выбранные даты квартира уже занята' })
    }
    const created: StoredBooking = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'new',
      apartmentId: apartment.id,
      apartmentTitle: apartment.title,
      name: input.name,
      phone: input.phone,
      email: input.email,
      guests: input.guests,
      from: input.from,
      to: input.to,
      checkInTime: input.checkInTime,
      checkOutTime: input.checkOutTime,
      comment: input.comment,
      nights,
      total: nights * apartment.price, // цену с клиента не берём
      currency: 'KZT',
    }
    await saveBooking(created)
    return created
  })

  // Сбой CRM не должен ломать бронирование: заявка уже сохранена, статус отправки запишем рядом
  try {
    const result = await sendBookingToBitrix24(booking)
    if (!result.skipped) {
      await saveBooking({ ...booking, crm: { provider: 'bitrix24', leadId: result.leadId } })
    }
  } catch (err) {
    console.error('[bookings] Bitrix24 push failed:', err)
    await saveBooking({
      ...booking,
      crm: { provider: 'bitrix24', error: err instanceof Error ? err.message : 'unknown error' },
    })
  }

  setResponseStatus(event, 201)
  return { id: booking.id, status: booking.status, nights: booking.nights, total: booking.total }
})
