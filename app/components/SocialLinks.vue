<script setup lang="ts">
import type { SocialName } from '#shared/types'

// round — иконки в белых кружках (как кнопка звонка в шапке)
withDefaults(defineProps<{ items?: SocialName[]; size?: number; round?: boolean }>(), {
  items: () => ['telegram', 'whatsapp', 'instagram', 'booking'],
  size: 28,
})

const meta: Record<SocialName, { label: string; href: string }> = {
  telegram: { label: 'Telegram', href: site.telegram },
  whatsapp: { label: 'WhatsApp', href: site.whatsapp },
  instagram: { label: 'Instagram', href: site.instagram },
  booking: { label: 'Booking.com', href: site.booking },
}
</script>

<template>
  <ul class="flex items-center gap-5">
    <li v-for="name in items" :key="name">
      <a
        :href="meta[name].href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="meta[name].label"
        :title="meta[name].label"
        class="block text-brand transition duration-300 ease-out hover:scale-110 hover:text-rose-dark focus-visible:scale-110 focus-visible:text-rose-dark"
        :class="[round &&'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white']"
      >
        <SocialIcon :name="name" :size="size" />
      </a>
    </li>
  </ul>
</template>
