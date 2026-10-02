const priceFormatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 })

export function formatPrice(value: number): string {
  return `${priceFormatter.format(value)} ₸`
}

export function pluralNights(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return `${n} ночь`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} ночи`
  return `${n} ночей`
}
