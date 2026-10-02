// Даты передаём строками YYYY-MM-DD — без часовых поясов и сюрпризов при сравнении.
const DAY_MS = 86_400_000
export const BUSINESS_TZ = 'Asia/Almaty'

/** Сегодняшняя дата в часовом поясе бизнеса (а не сервера/браузера). */
export function todayISO(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: BUSINESS_TZ })
}

export function isISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Количество ночей между заездом и выездом (0, если даты неполные или перепутаны). */
export function nightsBetween(from: string, to: string): number {
  if (!from || !to) return 0
  const n = Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS)
  return Number.isFinite(n) && n > 0 ? n : 0
}
