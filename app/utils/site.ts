// Контакты и ссылки в одном месте (раньше были размазаны по Header/Footer/иконкам).
export const site = {
  name: 'GoodHome',
  phone: '+7 705 987 01 17',
  phoneHref: 'tel:+77059870117',
  email: 'dauzer666@gmail.com',
  // TODO: проверить ссылку. Сейчас — по номеру телефона (работает, если в Telegram разрешён поиск по номеру).
  // Лучше заменить на https://t.me/<username>
  telegram: 'https://t.me/+77059870117',
  whatsapp: 'https://wa.me/77059870117',
  instagram: 'https://www.instagram.com/goodhome.pvl/',
  // TODO: заменить на ссылку на вашу страницу на Booking.com
  booking: 'https://www.booking.com/index.ru.html',
  // Цифры доверия под первым экраном главной. Пустое значение — пункт не показывается.
  stats: {
    rating: 9.5, // средняя оценка на Booking
    guests: undefined as number | undefined, // TODO: сколько гостей уже останавливалось, например 1500 → «1 500+»
    since: undefined as number | undefined, // TODO: год начала работы, например 2019 → «7 лет»
  },
} as const
