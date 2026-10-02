<script setup lang="ts">
import type { Apartment } from '#shared/types'
import { formatPrice } from '#shared/utils/format'

const route = useRoute()
const id = String(route.params.id)
const { open } = useBookingModal()

const { data: apartment, error } = await useFetch<Apartment>(`/api/apartments/${id}`, { key: `apartment-${id}` })

if (error.value || !apartment.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Апартаменты не найдены', fatal: true })
}

useSeoMeta({
  title: () => apartment.value?.title ?? 'Квартира',
  description: () => apartment.value?.description.slice(0, 160) ?? '',
  ogImage: () => apartment.value?.images[0],
})
</script>

<template>
  <div v-if="apartment" class="container-page py-6 lg:py-10">
    <NuxtLink to="/apartments" class="text-link mb-6 inline-block">← Все квартиры</NuxtLink>

    <div class="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <ImageGallery :images="apartment.images" :alt="apartment.title" />

      <div class="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
        <div>
          <h1 class="text-4xl lg:text-5xl">{{ apartment.title }}</h1>
          <p class="mt-2 text-muted">{{ apartment.address }}</p>
        </div>

        <div class="flex flex-col gap-4 border-y border-line py-6">
          <p>
            <span class="text-3xl font-medium">{{ formatPrice(apartment.price) }}</span>
            <span class="text-muted"> за сутки</span>
            <span class="block text-muted">до {{ apartment.tenantLimit }} гостей</span>
          </p>
          <button type="button" class="btn-primary w-full" @click="open(apartment)">Забронировать</button>
          <a
            v-if="apartment.videoUrl"
            :href="apartment.videoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary w-full"
          >
            Смотреть видео
          </a>
        </div>

        <p v-if="apartment.description">{{ apartment.description }}</p>

        <div v-if="apartment.amenities.length">
          <h2 class="mb-3 text-xl font-normal">Удобства</h2>
          <ul class="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            <li v-for="item in apartment.amenities" :key="item" class="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#287888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12l5 5L20 7" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
