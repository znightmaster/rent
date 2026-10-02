<script setup lang="ts">
useSeoMeta({
  title: 'О нас',
  description: 'GoodHome — сеть дизайнерских гостевых квартир в Павлодаре. Заселение без встречи, чистота, современный дизайн.',
})

const benefits = [
  'Предоставляем полный пакет документов',
  'Принимаем наличный и безналичный расчёт',
  'Действует система скидок',
  'Средняя оценка наших квартир на Booking — 9,5',
]
</script>

<template>
  <div class="container-page py-6 lg:py-12">
    <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
      <div class="flex flex-col gap-6">
        <h1 class="anim-rise text-4xl lg:text-6xl" style="--d: 150ms">Каждая квартира по-своему уникальна</h1>
        <p class="anim-rise max-w-xl text-lg" style="--d: 300ms">
          GoodHome — сеть дизайнерских гостевых квартир в Павлодаре. Идеальная чистота и современный дизайн
          приятно удивляют.
        </p>
        <p class="anim-rise max-w-xl text-muted" style="--d: 420ms">
          Заселение и выселение — без личной встречи: ключи лежат в сейфе рядом с дверью квартиры. Квартиры
          находятся в новых современных домах и оснащены бытовой техникой, посудой, свежим постельным бельём,
          средствами гигиены (мыло, шампунь, зубные щётки, тапочки) и безлимитным интернетом.
        </p>
        <NuxtLink to="/apartments" class="btn-primary anim-rise mt-2 w-fit" style="--d: 540ms">Выбрать квартиру</NuxtLink>
      </div>
      <DoorImage src="/img/banner-12.webp" alt="Интерьер квартиры GoodHome" reveal />
    </div>

    <ul class="mt-20 grid gap-x-12 gap-y-4 border-t border-line pt-10 sm:grid-cols-2">
      <li v-for="(item, index) in benefits" :key="item" v-reveal="index * 90" class="flex items-start gap-3">
        <svg class="mt-1.5 flex-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#287888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12l5 5L20 7" />
        </svg>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
