<script setup lang="ts">
import type { Apartment, SearchValue } from '#shared/types'

useSeoMeta({
  title: 'Гостевые квартиры в Павлодаре',
  description:
    'GoodHome — дизайнерские гостевые квартиры в Павлодаре. Заселение без встречи, чистота, современный дизайн.',
})

const search = ref<SearchValue>({ from: '', to: '', guests: 1 })
const { data: apartments } = await useFetch<Apartment[]>('/api/apartments')

function goSearch() {
  const { from, to, guests } = search.value
  navigateTo({ path: '/apartments', query: { guests, ...(from && to ? { from, to } : {}) } })
}

const facts = [
  { title: 'Заселение без встречи', text: 'Ключи лежат в сейфе рядом с дверью квартиры. Приезжайте в удобное время.' },
  { title: 'Всё уже есть', text: 'Техника, посуда, свежее бельё, средства гигиены и безлимитный интернет.' },
  { title: 'Новые дома', text: 'Квартиры в современных домах, с аккуратным дизайнерским ремонтом.' },
  { title: '9,5 на Booking', text: 'Такая средняя оценка у наших квартир на Booking.com.' },
]
const topReviews = reviews.slice(0, 3)
</script>

<template>
  <div>
    <!-- Первый экран: заголовок, поиск и «дверь» с фото -->
    <section class="container-page grid items-center gap-10 pb-16 pt-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-8">
      <div class="flex flex-col gap-6">
        <h1 class="anim-rise text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-7xl" style="--d: 150ms">Уют, в который хочется возвращаться</h1>
        <p class="anim-rise max-w-md text-lg text-muted" style="--d: 300ms">
          Дизайнерские квартиры в Павлодаре. Заселение без встречи, чистота и всё необходимое для жизни.
        </p>
        <div class="anim-rise mt-2 lg:relative lg:z-10 lg:mt-8 lg:w-[calc(100%+7rem)]" style="--d: 450ms">
          <ReservationBar v-model="search" @search="goSearch" />
        </div>
      </div>

      <DoorImage src="/img/banner-10.webp" alt="Гостиная в квартире GoodHome" position="35% center" reveal />
    </section>

    <!-- Квартиры -->
    <section v-if="apartments?.length" class="container-page" aria-labelledby="apartments-title">
      <div v-reveal class="mb-8 flex items-end justify-between gap-4">
        <h2 id="apartments-title" class="text-3xl lg:text-4xl">Квартиры</h2>
        <NuxtLink to="/apartments" class="text-link">Смотреть все</NuxtLink>
      </div>
      <!-- На телефоне — лента с прокруткой (следующая карточка выглядывает), на планшете и выше — сетка -->
      <div
        class="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
      >
        <div
          v-for="(apartment, index) in apartments.slice(0, 4)"
          :key="apartment.id"
          v-reveal="index * 90"
          class="w-[78%] flex-none snap-start sm:w-auto"
        >
          <ApartmentTile :apartment="apartment" />
        </div>
      </div>
    </section>

    <!-- Что входит -->
    <section class="container-page mt-24" aria-labelledby="facts-title">
      <h2 id="facts-title" v-reveal class="mb-8 text-3xl lg:text-4xl">Что входит в проживание</h2>
      <dl class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(fact, index) in facts" :key="fact.title" v-reveal="index * 100" class="border-t border-line pt-5">
          <dt class="text-xl font-normal">{{ fact.title }}</dt>
          <dd class="mt-2 text-muted">{{ fact.text }}</dd>
        </div>
      </dl>
    </section>

    <!-- Отзывы -->
    <section class="container-page mt-24" aria-labelledby="reviews-title">
      <h2 id="reviews-title" v-reveal class="mb-8 text-3xl lg:text-4xl">Говорят гости</h2>
      <div class="grid gap-8 md:grid-cols-3">
        <figure v-for="(review, index) in topReviews" :key="review.author" v-reveal="index * 120" class="flex flex-col justify-between gap-6 border-t border-line pt-5">
          <blockquote class="text-xl font-light leading-snug">«{{ review.text }}»</blockquote>
          <figcaption class="text-muted">{{ review.author }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Где мы -->
    <section class="container-page mt-24 grid items-stretch gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14" aria-labelledby="where-title">
      <div v-reveal class="flex flex-col justify-center gap-5">
        <h2 id="where-title" class="text-3xl lg:text-4xl">Мы в Павлодаре</h2>
        <p class="text-muted">Напишите или позвоните — подберём квартиру на ваши даты.</p>
        <a :href="site.phoneHref" class="text-2xl font-light transition hover:text-brand">{{ site.phone }}</a>
        <div class="flex flex-wrap gap-3">
          <a :href="site.telegram" target="_blank" rel="noopener noreferrer" class="btn-primary">Написать в Telegram</a>
          <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="btn-secondary">WhatsApp</a>
        </div>
      </div>
      <iframe
        :src="site.mapEmbed"
        v-reveal="150"
        title="Карта: где нас найти"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="h-[340px] w-full rounded-3xl border-0 lg:h-[420px]"
      />
    </section>
  </div>
</template>
