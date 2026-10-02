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

// icon — линейная иконка в арочном значке; stat — крупная цифра вместо иконки
const facts = [
  { icon: 'key', title: 'Заселение без встречи', text: 'Ключи лежат в сейфе рядом с дверью квартиры. Приезжайте в удобное время.' },
  { icon: 'bed', title: 'Всё уже есть', text: 'Техника, посуда, свежее бельё, средства гигиены и безлимитный интернет.' },
  { icon: 'house', title: 'Новые дома', text: 'Квартиры в современных домах, с аккуратным дизайнерским ремонтом.' },
  { stat: '9,5', title: 'Оценка на Booking', text: 'Такая средняя оценка у наших квартир на Booking.com.' },
]
</script>

<template>
  <div>
    <!-- Первый экран: заголовок, поиск и «дверь» с фото -->
    <section class="container-page grid items-center gap-10 pb-16 pt-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-8">
      <div class="flex flex-col gap-6">
        <h1 class="text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-7xl">Уют, в который хочется возвращаться</h1>
        <p class="max-w-md text-lg text-muted">
          Дизайнерские квартиры в Павлодаре. Заселение без встречи, чистота и всё необходимое для жизни.
        </p>
        <div class="hidden lg:relative lg:z-10 lg:mt-8 lg:block lg:w-[calc(100%+7rem)]">
          <ReservationBar v-model="search" @search="goSearch" />
        </div>
      </div>

      <!-- На телефоне поиск лежит на низу фото (14px — отступ фото от рамки «двери»), края совпадают -->
      <div class="relative">
        <DoorImage src="/img/banner-10.webp" alt="Гостиная в квартире GoodHome" position="35% center" reveal />
        <div class="absolute inset-x-[14px] bottom-[14px] lg:hidden">
          <ReservationBar v-model="search" @search="goSearch" />
        </div>
      </div>
    </section>

    <!-- Квартиры -->
    <section v-if="apartments?.length" class="container-page" aria-labelledby="apartments-title">
      <div class="mb-8 flex items-end justify-between gap-4">
        <h2 id="apartments-title" class="text-3xl lg:text-4xl">Квартиры</h2>
        <NuxtLink to="/apartments" class="text-link">Смотреть все</NuxtLink>
      </div>
      <!-- На телефоне — лента с прокруткой (следующая карточка выглядывает), на планшете и выше — сетка -->
      <div
        class="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
      >
        <div v-for="apartment in apartments.slice(0, 4)" :key="apartment.id" class="w-[78%] flex-none snap-start sm:w-auto">
          <ApartmentTile :apartment="apartment" />
        </div>
      </div>
    </section>

    <!-- Что входит -->
    <section class="container-page mt-24" aria-labelledby="facts-title">
      <h2 id="facts-title" class="mb-8 text-3xl lg:text-4xl">Что входит в проживание</h2>
      <dl class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <div
          v-for="fact in facts"
          :key="fact.title"
          class="flex flex-col gap-5 rounded-3xl p-7 transition duration-300"
          :class="fact.stat ? 'bg-rose-soft' : 'border border-line bg-white hover:border-rose'"
        >
          <p v-if="fact.stat" class="text-6xl font-light leading-none tracking-tight text-rose-dark" aria-hidden="true">
            {{ fact.stat }}
          </p>
          <!-- Значок в форме арки — та же дверь, что в логотипе: пудровая арка, бирюзовая иконка -->
          <span v-else class="flex h-14 w-12 items-center justify-center rounded-b-lg rounded-t-full bg-rose-soft text-brand" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <template v-if="fact.icon === 'key'">
                <circle cx="8" cy="15" r="4" />
                <path d="M10.9 12.1 20 3M16.5 6.5l2.5 2.5M14 9l2 2" />
              </template>
              <template v-else-if="fact.icon === 'bed'">
                <path d="M3 6v13M3 15h18v4M21 15v-2a3 3 0 0 0-3-3h-7v5" />
                <circle cx="7" cy="11.5" r="1.5" />
              </template>
              <path v-else d="M4 10.5 12 4l8 6.5V20H4zM10 20v-5h4v5" />
            </svg>
          </span>
          <div>
            <dt class="text-xl font-normal">{{ fact.title }}</dt>
            <dd class="mt-2 text-muted">{{ fact.text }}</dd>
          </div>
        </div>
      </dl>
    </section>

    <!-- Связаться: фирменная панель с контуром двери (карта — на странице «Контакты»).
         Три цвета логотипа: бирюзовый фон («HOME»), стальная дверь, розовая ручка («GOOD»). -->
    <section class="container-page mt-24" aria-labelledby="where-title">
      <div class="relative overflow-hidden rounded-[2rem] bg-brand px-7 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
        <svg
          class="pointer-events-none absolute -bottom-10 right-6 hidden h-[130%] md:block lg:right-16"
          viewBox="0 0 200 300"
          fill="none"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path d="M10 300V100a90 90 0 0 1 180 0v200" class="stroke-white/15" />
          <path d="M34 300V104a66 66 0 0 1 132 0v196" class="fill-steel/25 stroke-steel/60" />
          <circle cx="146" cy="190" r="5" class="fill-rose" />
        </svg>

        <div class="relative flex max-w-xl flex-col gap-5">
          <h2 id="where-title" class="text-3xl text-white lg:text-5xl">Мы в Павлодаре</h2>
          <p class="text-lg text-white/80">Напишите или позвоните — подберём квартиру на ваши даты.</p>
          <a :href="site.phoneHref" class="w-fit whitespace-nowrap text-3xl font-light transition hover:text-white/75 focus-visible:outline-white">
            {{ site.phone }}
          </a>
          <div class="mt-2 flex flex-wrap gap-3">
            <a
              :href="site.telegram"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-white !text-brand hover:!bg-rose-soft hover:!text-rose-dark focus-visible:outline-white"
            >
              Написать в Telegram
            </a>
            <a
              :href="site.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary border border-white/40 !bg-transparent hover:!bg-white/10 focus-visible:outline-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
