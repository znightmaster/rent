import type { Apartment } from '#shared/types'
import raw from '../data/apartments.json'

/**
 * Репозиторий квартир — единственное место, которое знает, ОТКУДА берутся данные.
 * Сейчас это JSON-файл (в том же формате, что был в jsonbin: tenant_limit и т.д.).
 * Когда появится админка, меняется только реализация этих функций (БД / CMS),
 * а API-роуты и фронтенд остаются как есть.
 */
interface RawApartment {
  id: number | string
  title: string
  address: string
  description?: string
  amenities?: string[]
  price: number
  tenant_limit: number
  images?: string[]
  video_url?: string
}

const FALLBACK_IMAGE = '/img/banner-8.webp'

function normalize(r: RawApartment): Apartment {
  return {
    id: String(r.id),
    title: r.title,
    address: r.address,
    description: r.description ?? '',
    amenities: r.amenities ?? [],
    price: Number(r.price),
    tenantLimit: Number(r.tenant_limit),
    images: r.images?.length ? r.images : [FALLBACK_IMAGE],
    videoUrl: r.video_url || undefined,
  }
}

const apartments: Apartment[] = (raw as RawApartment[]).map(normalize)

export async function getAllApartments(): Promise<Apartment[]> {
  return apartments
}

export async function getApartmentById(id: string): Promise<Apartment | undefined> {
  return apartments.find((a) => a.id === String(id))
}
