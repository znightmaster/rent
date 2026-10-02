# GoodHome (Nuxt 4)

Сайт гостевых квартир в Павлодаре. Перенос с Vue 3 + Vite на Nuxt 4 (SSR).

## Запуск

```sh
npm install
cp .env.example .env   # при необходимости впишите вебхук Bitrix24
npm run dev            # http://localhost:3000
npm run build && node .output/server/index.mjs   # прод-сборка
```

Нужен Node 20+ (лучше 22).

## Структура

```
app/
  pages/            index, about, contact, apartments/index, apartments/[id]
  components/       UI-компоненты (без префикса папок)
  composables/      useBookingModal (замена Pinia-стора)
  utils/            site.ts (контакты), reviews.ts
server/
  api/              GET /api/apartments, GET /api/apartments/:id, POST /api/bookings
  utils/            apartments.ts (репозиторий), bookings.ts, crm.ts (Bitrix24), rateLimit.ts
  data/apartments.json   ДЕМО-данные: замените своими (поля как в jsonbin)
shared/             типы и утилиты дат/форматирования для фронта и сервера
public/             картинки (WebP), иконки, логотип
```

## Что нужно сделать перед запуском

1. Вставить свои квартиры в `server/data/apartments.json` (формат как в вашем jsonbin: `tenant_limit`, `amenities`, ...).
   Фото положите в `public/img/apartments/` и укажите пути в поле `images`.
2. Перевыпустить ключ jsonbin (он был в клиентском коде и считается скомпрометированным).
3. Подставить реальную ссылку на Booking.com в `app/utils/site.ts`.
4. Задать `NUXT_BITRIX24_WEBHOOK_URL`, чтобы заявки уходили в CRM.

## Заявки и CRM

`POST /api/bookings` валидирует данные, проверяет, что даты свободны, считает сумму на сервере,
сохраняет заявку в `.data/` и создаёт лид в Bitrix24 (`crm.lead.add`). Сбой CRM не ломает бронь:
ошибка записывается в заявку. Без вебхука заявки только сохраняются локально.

Подробный разбор и план дальнейших шагов — в `REVIEW.md`.
