import type { StoredBooking } from './bookings'

/**
 * Отправка заявки в Bitrix24 через входящий вебхук.
 *
 * Сейчас создаётся ЛИД (crm.lead.add). Если на портале включён «простой CRM»
 * (только сделки, без лидов), метод crm.lead.add будет недоступен — тогда замените
 * на связку crm.contact.add + crm.deal.add (структура полей аналогичная).
 *
 * Если NUXT_BITRIX24_WEBHOOK_URL не задан — функция ничего не делает (удобно для разработки).
 */
export async function sendBookingToBitrix24(booking: StoredBooking): Promise<{ leadId?: number; skipped?: boolean }> {
  const { bitrix24WebhookUrl } = useRuntimeConfig()
  if (!bitrix24WebhookUrl) return { skipped: true }

  const base = String(bitrix24WebhookUrl).replace(/\/+$/, '')

  const comments = [
    `Квартира: ${booking.apartmentTitle} (id ${booking.apartmentId})`,
    `Даты: ${booking.from} (с ${booking.checkInTime}) — ${booking.to} (до ${booking.checkOutTime}), ночей: ${booking.nights}`,
    `Гостей: ${booking.guests}`,
    booking.comment ? `Пожелания: ${booking.comment}` : '',
    `Заявка на сайте: ${booking.id}`,
  ]
    .filter(Boolean)
    .join('\n')

  const response = await $fetch<{ result?: number; error?: string; error_description?: string }>(
    `${base}/crm.lead.add.json`,
    {
      method: 'POST',
      timeout: 8000,
      retry: 1,
      body: {
        fields: {
          TITLE: `Бронь с сайта: ${booking.apartmentTitle}, ${booking.from} — ${booking.to}`,
          NAME: booking.name,
          PHONE: [{ VALUE: booking.phone, VALUE_TYPE: 'WORK' }],
          EMAIL: booking.email ? [{ VALUE: booking.email, VALUE_TYPE: 'WORK' }] : [],
          OPPORTUNITY: booking.total,
          CURRENCY_ID: booking.currency,
          COMMENTS: comments,
          SOURCE_ID: 'WEB',
        },
        params: { REGISTER_SONET_EVENT: 'N' },
      },
    },
  )

  if (response.error) {
    throw new Error(`Bitrix24: ${response.error} ${response.error_description ?? ''}`.trim())
  }
  return { leadId: response.result }
}
