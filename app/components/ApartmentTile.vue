<script setup lang="ts">
import type { Apartment } from '#shared/types'
import { formatPrice } from '#shared/utils/format'

defineProps<{ apartment: Apartment }>()
</script>

<template>
  <NuxtLink :to="`/apartments/${apartment.id}`" class="group flex flex-col gap-4">
    <div class="aspect-[4/5] overflow-hidden rounded-3xl bg-mist">
      <NuxtImg
        :src="apartment.images[0]"
        :alt="apartment.title"
        width="640"
        height="800"
        sizes="78vw sm:50vw lg:280px"
        loading="lazy"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="flex flex-col gap-1">
      <h3 class="text-xl font-normal underline-offset-4 group-hover:underline">{{ apartment.title }}</h3>
      <p class="text-muted">до {{ apartment.tenantLimit }} гостей</p>
      <p class="mt-1">
        <span class="text-lg font-medium">{{ formatPrice(apartment.price) }}</span>
        <span class="text-muted"> за сутки</span>
      </p>
    </div>
  </NuxtLink>
</template>
