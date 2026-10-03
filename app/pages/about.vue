<script setup lang="ts">
useSeoMeta({
  title: 'О нас',
  description: 'GoodHome — сеть дизайнерских гостевых квартир в Павлодаре. Бесконтактное заселение, чистота, современный дизайн.',
})

const included = ['Бытовая техника', 'Посуда', 'Свежее постельное бельё', 'Мыло и шампунь', 'Зубные щётки', 'Тапочки', 'Безлимитный интернет']

// icon — линейная иконка в арочном значке; stat — крупная цифра вместо иконки
const benefits = [
  { icon: 'doc', title: 'Полный пакет документов', text: 'Предоставляем документы для командировок и отчётности.' },
  { icon: 'card', title: 'Наличные и безнал', text: 'Принимаем наличный и безналичный расчёт.' },
  { icon: 'percent', title: 'Система скидок', text: 'Действует система скидок — уточняйте при бронировании.' },
  { stat: '9,5', title: 'Оценка на Booking', text: 'Средняя оценка наших квартир на Booking.com.' },
]
</script>

<template>
  <div class="container-page py-6 lg:py-12">
    <!-- Первый экран -->
    <section class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
      <div class="flex flex-col gap-6">
        <p class="text-sm uppercase tracking-[0.2em] text-rose-dark">О GoodHome</p>
        <h1 class="text-4xl lg:text-6xl">Каждая квартира по-своему уникальна</h1>
        <p class="max-w-xl text-lg text-muted">
          GoodHome — сеть дизайнерских гостевых квартир в Павлодаре. Идеальная чистота и современный дизайн приятно
          удивляют.
        </p>
        <NuxtLink to="/apartments" class="btn-primary mt-2 w-fit">Выбрать квартиру</NuxtLink>
      </div>
      <DoorImage src="/img/banner-12.webp" alt="Интерьер квартиры GoodHome" reveal />
    </section>

    <!-- Квартиры: фото-арка и что внутри -->
    <section class="mt-24 grid items-center gap-10 md:grid-cols-[0.8fr_1fr] lg:mt-32 lg:gap-20" aria-labelledby="inside-title">
      <div class="relative mx-auto w-full max-w-sm md:max-w-none">
        <!-- Арочный верх — то же окно-дверь, что в логотипе -->
        <NuxtImg
          src="/img/banner-11.webp"
          alt="Кухня-столовая с арочным окном"
          width="800"
          height="1000"
          sizes="100vw md:420px"
          loading="lazy"
          class="aspect-[4/5] w-full rounded-b-3xl rounded-t-full object-cover"
        />
        <span class="absolute -bottom-4 -right-2 rounded-full bg-white px-4 py-2 text-sm shadow-[0_10px_30px_-12px_rgba(36,52,59,0.4)] md:-right-6">
          Новые дома · Павлодар
        </span>
      </div>

      <div class="flex flex-col gap-8">
        <h2 id="inside-title" class="text-3xl lg:text-4xl">Приезжайте — всё уже готово</h2>
        <div class="flex flex-col gap-5 text-muted">
          <p>
            <span class="text-ink">Дизайн и новые дома.</span> Квартиры находятся в современных домах, с аккуратным
            дизайнерским ремонтом.
          </p>
          <p>
            <span class="text-ink">Идеальная чистота.</span> Чистая квартира и свежее постельное бельё к вашему приезду.
          </p>
          <p>
            <span class="text-ink">Без встречи.</span> Заселение и выселение бесконтактные: на дверях электронные
            замки, код мы присылаем перед заездом.
          </p>
        </div>
        <div>
          <p class="mb-3 font-medium">В каждой квартире</p>
          <ul class="flex flex-wrap gap-2">
            <li v-for="item in included" :key="item" class="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Пара фото -->
    <div class="mt-24 grid gap-4 md:grid-cols-[1.35fr_1fr] lg:mt-32 lg:gap-5">
      <NuxtImg
        src="/img/banner-8.webp"
        alt="Гостиная в квартире GoodHome"
        width="1200"
        height="900"
        sizes="100vw md:700px"
        loading="lazy"
        class="aspect-[4/3] h-full w-full rounded-3xl object-cover"
      />
      <NuxtImg
        src="/img/banner-9.webp"
        alt="Спальня в квартире GoodHome"
        width="900"
        height="900"
        sizes="100vw md:500px"
        loading="lazy"
        class="aspect-[4/3] h-full w-full rounded-3xl object-cover md:aspect-auto"
      />
    </div>

    <!-- Для гостей -->
    <section class="mt-24 lg:mt-32" aria-labelledby="benefits-title">
      <h2 id="benefits-title" class="mb-8 text-3xl lg:text-4xl">Удобно для поездок и командировок</h2>
      <dl class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <div
          v-for="b in benefits"
          :key="b.title"
          class="flex flex-col gap-5 rounded-3xl p-7 transition duration-300"
          :class="b.stat ? 'bg-rose-soft' : 'border border-line bg-white hover:border-rose'"
        >
          <p v-if="b.stat" class="text-6xl font-light leading-none tracking-tight text-rose-dark" aria-hidden="true">{{ b.stat }}</p>
          <span v-else class="flex h-14 w-12 items-center justify-center rounded-b-lg rounded-t-full bg-rose-soft text-brand" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path v-if="b.icon === 'doc'" d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />
              <template v-else-if="b.icon === 'card'">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M3 10h18M7 14.5h3" />
              </template>
              <template v-else>
                <path d="M18.5 5.5l-13 13" />
                <circle cx="7.5" cy="7.5" r="2" />
                <circle cx="16.5" cy="16.5" r="2" />
              </template>
            </svg>
          </span>
          <div>
            <dt class="text-xl font-normal">{{ b.title }}</dt>
            <dd class="mt-2 text-muted">{{ b.text }}</dd>
          </div>
        </div>
      </dl>
    </section>

    <!-- Финал -->
    <section class="mt-24 flex flex-col items-center gap-6 rounded-3xl bg-rose-soft px-7 py-12 text-center lg:mt-32 lg:py-16">
      <h2 class="max-w-xl text-3xl lg:text-4xl">Подберём квартиру на ваши даты</h2>
      <p class="max-w-md text-muted">Выберите на сайте или напишите нам — ответим и поможем с выбором.</p>
      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLink to="/apartments" class="btn-primary">Выбрать квартиру</NuxtLink>
        <NuxtLink to="/contact" class="btn-secondary">Связаться</NuxtLink>
      </div>
    </section>
  </div>
</template>
