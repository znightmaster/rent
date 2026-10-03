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
} as const
