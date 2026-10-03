<script setup lang="ts">
useSeoMeta({
  title: 'Контакты',
  description: 'Свяжитесь с GoodHome: Telegram, WhatsApp, телефон, e-mail. Гостевые квартиры в Павлодаре.',
})

// Способы связи. Telegram — основной канал, его плитка выделена бирюзовым (главное действие)
const channels = [
  { icon: 'telegram', title: 'Telegram', value: 'Написать в чат', hint: 'Отвечаем быстрее всего', href: site.telegram, external: true, main: true },
  { icon: 'whatsapp', title: 'WhatsApp', value: 'Написать в чат', hint: 'Сообщения и звонки', href: site.whatsapp, external: true },
  { icon: 'phone', title: 'Телефон', value: site.phone, hint: 'Подберём квартиру на ваши даты', href: site.phoneHref },
  { icon: 'mail', title: 'Почта', value: site.email, hint: 'Для документов и счетов', href: `mailto:${site.email}` },
] as const

const steps = [
  { title: 'Выберите квартиру', text: 'Подберите даты и количество гостей на сайте или просто напишите нам — поможем с выбором.' },
  { title: 'Подтвердим бронь', text: 'Ответим, пришлём адрес и всё для заселения. Оплата наличными или безналичным расчётом.' },
  { title: 'Заселяйтесь сами', text: 'Заселение бесконтактное: на дверях электронные замки, код пришлём перед заездом. Приезжайте в удобное время.' },
]
</script>

<template>
  <div class="container-page py-6 lg:py-12">
    <h1 class="text-4xl lg:text-6xl">Контакты</h1>
    <p class="mt-4 max-w-md text-lg text-muted">Напишите или позвоните — подберём квартиру на ваши даты.</p>

    <!-- Способы связи: вся плитка — ссылка -->
    <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      <li v-for="c in channels" :key="c.icon">
        <a
          :href="c.href"
          :target="'external' in c ? '_blank' : undefined"
          :rel="'external' in c ? 'noopener noreferrer' : undefined"
          class="group flex h-full flex-col gap-5 rounded-3xl p-7 transition duration-300 hover:-translate-y-1"
          :class="'main' in c ? 'bg-brand text-white hover:bg-brand-dark' : 'border border-line bg-white hover:border-rose'"
        >
          <!-- Значок-арка — дверь из логотипа -->
          <span
            class="flex h-14 w-12 items-center justify-center rounded-b-lg rounded-t-full"
            :class="'main' in c ? 'bg-white/15 text-white' : 'bg-rose-soft text-brand'"
            aria-hidden="true"
          >
            <SocialIcon :name="c.icon" :size="c.icon === 'phone' || c.icon === 'mail' ? 22 : 24" />
          </span>
          <span class="flex flex-col gap-1">
            <span class="text-sm" :class="'main' in c ? 'text-white/75' : 'text-muted'">{{ c.title }}</span>
            <span class="break-all text-xl" :class="'main' in c ? '' : 'transition group-hover:text-rose-dark'">{{ c.value }}</span>
          </span>
          <span class="mt-auto text-sm" :class="'main' in c ? 'text-white/75' : 'text-muted'">{{ c.hint }}</span>
        </a>
      </li>
    </ul>

    <!-- Как проходит бронирование -->
    <section class="mt-24" aria-labelledby="steps-title">
      <h2 id="steps-title" class="mb-8 text-3xl lg:text-4xl">Как проходит бронирование</h2>
      <ol class="grid gap-8 md:grid-cols-3 md:gap-10">
        <li v-for="(step, i) in steps" :key="step.title" class="flex gap-5 border-t border-line pt-6 md:flex-col md:gap-4">
          <span class="text-5xl font-light leading-none text-rose-dark" aria-hidden="true">{{ i + 1 }}</span>
          <span>
            <span class="block text-xl">{{ step.title }}</span>
            <span class="mt-2 block text-muted">{{ step.text }}</span>
          </span>
        </li>
      </ol>
    </section>

    <!-- Фото и отзывы -->
    <section
      class="mt-24 flex flex-col gap-6 rounded-3xl bg-rose-soft px-7 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-12"
      aria-labelledby="more-title"
    >
      <div>
        <h2 id="more-title" class="text-2xl lg:text-3xl">Фото и отзывы гостей</h2>
        <p class="mt-2 max-w-md text-muted">Свежие фото квартир — в Instagram, оценки и отзывы — на Booking.com.</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a :href="site.instagram" target="_blank" rel="noopener noreferrer" class="btn-secondary gap-2.5">
          <SocialIcon name="instagram" :size="20" />
          Instagram
        </a>
        <a :href="site.booking" target="_blank" rel="noopener noreferrer" class="btn-secondary gap-2.5">
          <SocialIcon name="booking" :size="20" />
          Booking
        </a>
      </div>
    </section>
  </div>
</template>
