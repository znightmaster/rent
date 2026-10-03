<script setup lang="ts">
import type { Apartment, BookingPreset } from '#shared/types'
import { formatPrice } from '#shared/utils/format'

const props = defineProps<{ apartment: Apartment; preset?: BookingPreset }>()
const { open } = useBookingModal()
const amenityLabel = useAmenityLabel()

// Удобства «таблетками»: первые несколько + счётчик остальных
const MAX_AMENITIES = 4
const shownAmenities = computed(() => props.apartment.amenities.slice(0, MAX_AMENITIES))
const restAmenities = computed(() => props.apartment.amenities.length - MAX_AMENITIES)
</script>

<template>
  <article class="group flex h-full flex-col rounded-3xl border border-line bg-white p-3 transition duration-300 hover:border-rose">
    <NuxtLinkLocale
      :to="`/apartments/${apartment.id}`"
      class="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-mist"
      :aria-label="apartment.title"
    >
      <NuxtImg
        :src="apartment.images[0]"
        :alt="apartment.title"
        width="800"
        height="600"
        sizes="100vw md:50vw lg:580px"
        loading="lazy"
        class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
      />
      <span class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm backdrop-blur">
        {{ $t('common.upToGuests', apartment.tenantLimit) }}
      </span>
      <span v-if="apartment.images.length > 1" class="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm backdrop-blur">
        {{ $t('common.photos', apartment.images.length) }}
      </span>
    </NuxtLinkLocale>

    <div class="flex flex-1 flex-col gap-4 px-3 pb-3 pt-5">
      <div>
        <h2 class="text-2xl font-normal">
          <NuxtLinkLocale :to="`/apartments/${apartment.id}`" class="transition hover:text-rose-dark">
            {{ apartment.title }}
          </NuxtLinkLocale>
        </h2>
        <p class="mt-1 text-muted">{{ apartment.address }}</p>
      </div>

      <p class="line-clamp-2 text-muted">{{ apartment.description }}</p>

      <ul v-if="shownAmenities.length" class="flex flex-wrap gap-2" :aria-label="$t('apartments.amenitiesTitle')">
        <li v-for="item in shownAmenities" :key="item" class="rounded-full bg-mist px-3 py-1 text-sm">{{ amenityLabel(item) }}</li>
        <li v-if="restAmenities > 0" class="rounded-full bg-rose-soft px-3 py-1 text-sm text-rose-dark">+{{ restAmenities }}</li>
      </ul>

      <div class="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p>
          <span class="text-2xl font-medium">{{ formatPrice(apartment.price) }}</span>
          <span class="text-muted"> {{ $t('common.perNight') }}</span>
        </p>
        <div class="flex flex-wrap gap-2">
          <NuxtLinkLocale :to="`/apartments/${apartment.id}`" class="btn-secondary !px-5">{{ $t('common.more') }}</NuxtLinkLocale>
          <button type="button" class="btn-primary !px-5" @click="open(apartment, preset)">{{ $t('common.book') }}</button>
        </div>
      </div>
    </div>
  </article>
</template>
