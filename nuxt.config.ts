export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/i18n'],

  // Языки: русский — по старым адресам (/apartments), остальные — с префиксом (/en/apartments, /kk/apartments).
  // Тексты — в i18n/locales/*.json
  i18n: {
    // Адрес сайта для hreflang-ссылок (поисковикам). TODO: заменить, когда появится свой домен.
    baseUrl: 'https://rent-seven-ruddy.vercel.app',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'kk', language: 'kk-KZ', name: 'Қазақша', file: 'kk.json' },
    ],
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },
  css: ['~/assets/css/main.css'],

  // Компоненты из подпапок доступны по короткому имени: <ApartmentCard />, а не <UiApartmentCard />
  components: [{ path: '~/components', pathPrefix: false }],

  app: {
    head: {
      titleTemplate: '%s — GoodHome',
      title: 'Гостевые квартиры в Павлодаре',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'GoodHome — сеть дизайнерских гостевых квартир в Павлодаре. Бесконтактное заселение, чистота и современный дизайн.',
        },
        { name: 'theme-color', content: '#FBFAF8' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap' },
      ],
    },
  },

  image: {
    format: ['webp'],
  },

  // Секреты — только на сервере. Задаются переменными окружения (см. .env.example).
  runtimeConfig: {
    bitrix24WebhookUrl: '', // NUXT_BITRIX24_WEBHOOK_URL
  },

  // Хранилище заявок (dev/MVP). В проде заменить на БД — см. REVIEW.md.
  nitro: {
    storage: {
      data: { driver: 'fs', base: './.data' },
    },
  },
})
