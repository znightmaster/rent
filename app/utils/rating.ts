// Оценка с десятичным разделителем языка: «9,5» по-русски и по-казахски, «9.5» по-английски
export function formatRating(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'ru-RU', { maximumFractionDigits: 1 }).format(value)
}
