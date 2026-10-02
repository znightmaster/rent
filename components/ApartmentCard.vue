<script setup lang="ts">
import type { Apartment, BookingPreset } from '#shared/types'
import { formatPrice } from '#shared/utils/format'

const props = defineProps<{ apartment: Apartment; preset?: BookingPreset }>()
const { open } = useBookingModal()

const MAX_AMENITIES = 5
const amenitiesLine = computed(() => {
  const all = props.apartment.amenities
  const shown = all.slice(0, MAX_AMENITIES).join(', ')
  const rest = all.length - MAX_AMENITIES
  return rest > 0 ? `${shown} и ещё ${rest}` : shown
})
</script>

<template>
  <article class="grid gap-5 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10 md:py-10">
    <NuxtLink
      :to="`/apartments/${apartment.id}`"
      class="group block aspect-[4/3] overflow-hidden rounded-3xl bg-mist"
      :aria-label="apartment.title"
    >
      <NuxtImg
        :src="apartment.images[0]"
        :alt="apartment.title"
        width="800"
        height="600"
        sizes="100vw md:480px"
        loading="lazy"
        class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
    </NuxtLink>

    <div class="flex flex-col justify-between gap-6">
      <div>
        <h2 class="text-2xl font-normal md:text-3xl">
          <NuxtLink :to="`/apartments/${apartment.id}`" class="underline-offset-4 hover:underline">
            {{ apartment.title }}
          </NuxtLink>
        </h2>
        <p class="mt-1 text-muted">{{ apartment.address }}</p>
        <p class="mt-4 line-clamp-3 max-w-xl">{{ apartment.description }}</p>
        <p v-if="amenitiesLine" class="mt-3 text-sm text-muted">{{ amenitiesLine }}</p>
      </div>

      <div class="flex flex-wrap items-end justify-between gap-4">
        <p>
          <span class="text-2xl font-medium">{{ formatPrice(apartment.price) }}</span>
          <span class="text-muted"> за сутки</span>
          <span class="block text-sm text-muted">до {{ apartment.tenantLimit }} гостей</span>
        </p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink :to="`/apartments/${apartment.id}`" class="btn-secondary">Подробнее</NuxtLink>
          <button type="button" class="btn-primary" @click="open(apartment, preset)">Забронировать</button>
        </div>
      </div>
    </div>
  </article>
</template>
