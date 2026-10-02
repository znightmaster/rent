/** Квартира в том виде, в каком её получает фронтенд. */
export interface Apartment {
  id: string
  title: string
  address: string
  description: string
  amenities: string[]
  /** Цена за сутки, ₸ */
  price: number
  /** Максимум гостей (спальных мест) */
  tenantLimit: number
  images: string[]
  videoUrl?: string
}

export interface BookingRequest {
  apartmentId: string
  name: string
  phone: string
  email?: string
  guests: number
  /** Дата заезда, YYYY-MM-DD */
  from: string
  /** Дата выезда, YYYY-MM-DD */
  to: string
  checkInTime: string
  checkOutTime: string
  comment?: string
  consent: boolean
  /** Honeypot: реальные пользователи это поле не видят и не заполняют */
  website?: string
}

export type BookingStatus = 'new' | 'confirmed' | 'cancelled'

export interface BookingResponse {
  id: string
  status: BookingStatus
  nights: number
  total: number
}

/** Значения формы поиска (даты — YYYY-MM-DD, пустая строка = не выбрано). */
export interface SearchValue {
  from: string
  to: string
  guests: number
}

/** Предзаполнение окна бронирования (например, из поиска). */
export interface BookingPreset {
  from?: string
  to?: string
  guests?: number
}

export type SocialName = 'telegram' | 'whatsapp' | 'instagram' | 'booking'
