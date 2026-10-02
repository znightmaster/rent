<script setup lang="ts">
import type { SocialName } from '#shared/types'

withDefaults(defineProps<{ items?: SocialName[]; size?: number }>(), {
  items: () => ['telegram', 'whatsapp', 'instagram', 'booking'],
  size: 28,
})

// Цвета при наведении — фирменные цвета приложений (классы записаны целиком, чтобы Tailwind их увидел)
const meta: Record<SocialName, { label: string; href: string; hover: string }> = {
  telegram: { label: 'Telegram', href: site.telegram, hover: 'hover:text-[#229ED9] focus-visible:text-[#229ED9]' },
  whatsapp: { label: 'WhatsApp', href: site.whatsapp, hover: 'hover:text-[#25D366] focus-visible:text-[#25D366]' },
  instagram: { label: 'Instagram', href: site.instagram, hover: 'hover:text-[#E4405F] focus-visible:text-[#E4405F]' },
  booking: { label: 'Booking.com', href: site.booking, hover: 'hover:text-[#003580] focus-visible:text-[#003580]' },
}
</script>

<template>
  <ul class="flex items-center gap-4">
    <li v-for="name in items" :key="name">
      <a
        :href="meta[name].href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="meta[name].label"
        :title="meta[name].label"
        class="block text-brand transition duration-300 ease-out hover:scale-110 focus-visible:scale-110"
        :class="meta[name].hover"
      >
        <SocialIcon :name="name" :size="size" />
      </a>
    </li>
  </ul>
</template>
