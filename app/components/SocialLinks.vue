<script setup lang="ts">
import type { SocialName } from '#shared/types'

type LinkName = SocialName | 'phone' | 'mail'

// round — иконки в белых кружках (как кнопка звонка в шапке)
const { t } = useI18n()

withDefaults(defineProps<{ items?: LinkName[]; size?: number; round?: boolean }>(), {
  items: () => ['telegram', 'whatsapp', 'instagram', 'booking'],
  size: 28,
})

// Цвета при наведении — фирменные цвета приложений (классы записаны целиком, чтобы Tailwind их увидел).
// У телефона и почты своего цвета нет — пудровый, как остальные наведения на сайте.
const meta = computed<Record<LinkName, { label: string; href: string; hover: string; external?: boolean }>>(() => ({
  phone: { label: t('common.call', { phone: site.phone }), href: site.phoneHref, hover: 'hover:text-rose-dark focus-visible:text-rose-dark' },
  mail: { label: t('common.mail', { email: site.email }), href: `mailto:${site.email}`, hover: 'hover:text-rose-dark focus-visible:text-rose-dark' },
  telegram: { label: 'Telegram', href: site.telegram, hover: 'hover:text-[#229ED9] focus-visible:text-[#229ED9]', external: true },
  whatsapp: { label: 'WhatsApp', href: site.whatsapp, hover: 'hover:text-[#25D366] focus-visible:text-[#25D366]', external: true },
  instagram: { label: 'Instagram', href: site.instagram, hover: 'hover:text-[#E4405F] focus-visible:text-[#E4405F]', external: true },
  booking: { label: 'Booking.com', href: site.booking, hover: 'hover:text-[#003580] focus-visible:text-[#003580]', external: true },
}))
</script>

<template>
  <ul class="flex items-center gap-5">
    <li v-for="name in items" :key="name">
      <a
        :href="meta[name].href"
        :target="meta[name].external ? '_blank' : undefined"
        :rel="meta[name].external ? 'noopener noreferrer' : undefined"
        :aria-label="meta[name].label"
        :title="meta[name].label"
        class="block text-brand transition duration-300 ease-out hover:scale-110 focus-visible:scale-110"
        :class="[meta[name].hover, round && 'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white']"
      >
        <SocialIcon :name="name" :size="name === 'phone' || name === 'mail' ? Math.round(size * 0.9) : size" />
      </a>
    </li>
  </ul>
</template>
