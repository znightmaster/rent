import type { BookingStatus } from '#shared/types'

export interface StoredBooking {
  id: string
  createdAt: string
  status: BookingStatus
  apartmentId: string
  apartmentTitle: string
  name: string
  phone: string
  email: string
  guests: number
  from: string
  to: string
  checkInTime: string
  checkOutTime: string
  comment: string
  nights: number
  /** Считается на сервере: ночи × цена квартиры. Цену с клиента не принимаем. */
  total: number
  currency: 'KZT'
  crm?: { provider: 'bitrix24'; leadId?: number; error?: string }
}

/**
 * Хранилище заявок: Nitro storage ('data' → папка .data, см. nuxt.config.ts).
 * Подходит для MVP на одном сервере. Для прода — заменить на PostgreSQL/SQLite:
 * там проверка пересечений дат делается в одной транзакции.
 */
const storage = () => useStorage<StoredBooking>('data')

export async function listBookings(): Promise<StoredBooking[]> {
  const s = storage()
  const keys = await s.getKeys('bookings')
  const items = await Promise.all(keys.map((key) => s.getItem(key)))
  return items.filter((b): b is StoredBooking => Boolean(b))
}

export async function saveBooking(booking: StoredBooking): Promise<void> {
  await storage().setItem(`bookings:${booking.id}`, booking)
}

// Периоды полуоткрытые [from, to): выезд 10-го и заезд 10-го не конфликтуют.
const overlaps = (aFrom: string, aTo: string, bFrom: string, bTo: string) => aFrom < bTo && bFrom < aTo

export async function hasOverlap(apartmentId: string, from: string, to: string): Promise<boolean> {
  const all = await listBookings()
  return all.some(
    (b) => b.apartmentId === apartmentId && b.status !== 'cancelled' && overlaps(b.from, b.to, from, to),
  )
}

/** Квартиры, занятые хотя бы на часть выбранного периода. */
export async function busyApartmentIds(from: string, to: string): Promise<Set<string>> {
  const all = await listBookings()
  return new Set(
    all.filter((b) => b.status !== 'cancelled' && overlaps(b.from, b.to, from, to)).map((b) => b.apartmentId),
  )
}

// Очередь внутри одного процесса: две одновременные заявки на одни даты не пройдут обе.
// При нескольких инстансах сервера этого мало — нужна БД с транзакциями.
let chain: Promise<unknown> = Promise.resolve()
export function withBookingLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn)
  chain = run.catch(() => undefined)
  return run
}
