import type { H3Event } from 'h3'

// Простейший лимитер в памяти процесса. Для прода с несколькими инстансами —
// ограничивайте на уровне nginx/Cloudflare или в Redis.
const hits = new Map<string, number[]>()

export function rateLimit(event: H3Event, opts: { key: string; limit: number; windowMs: number }) {
  // xForwardedFor доверяем только если сервер стоит за вашим прокси (nginx/Cloudflare),
  // иначе заголовок можно подделать.
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const id = `${opts.key}:${ip}`
  const now = Date.now()

  const recent = (hits.get(id) ?? []).filter((t) => now - t < opts.windowMs)
  if (recent.length >= opts.limit) {
    throw createError({ statusCode: 429, message: 'Слишком много запросов. Попробуйте через минуту.' })
  }
  recent.push(now)
  hits.set(id, recent)

  // Чтобы карта не росла бесконечно
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < opts.windowMs)) hits.delete(k)
    }
  }
}
