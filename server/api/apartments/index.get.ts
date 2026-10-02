import { z } from 'zod'
import { isISODate } from '#shared/utils/date'

const querySchema = z.object({
  guests: z.coerce.number().int().min(1).max(20).optional(),
  from: z.string().refine(isISODate, 'Некорректная дата заезда').optional(),
  to: z.string().refine(isISODate, 'Некорректная дата выезда').optional(),
})

export default defineEventHandler(async (event) => {
  const parsed = querySchema.safeParse(getQuery(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message ?? 'Некорректный запрос' })
  }
  const { guests = 1, from, to } = parsed.data

  let list = (await getAllApartments()).filter((a) => a.tenantLimit >= guests)

  // Фильтр по датам включаем только когда заданы обе даты
  if (from && to) {
    if (from >= to) {
      throw createError({ statusCode: 400, message: 'Дата выезда должна быть позже даты заезда' })
    }
    const busy = await busyApartmentIds(from, to)
    list = list.filter((a) => !busy.has(a.id))
  }

  return list
})
