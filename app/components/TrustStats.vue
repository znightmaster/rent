<script setup lang="ts">
// Цифры доверия: оценка, число гостей, годы работы. Значения — в site.stats; пустые пункты скрываются.
const { t, locale } = useI18n()

const items = computed(() => {
  const num = new Intl.NumberFormat(locale.value === 'en' ? 'en-US' : 'ru-RU')
  const { rating, guests, since } = site.stats
  const years = since ? new Date().getFullYear() - since : 0
  return [
    rating && { value: formatRating(rating, locale.value), label: t('trust.rating') },
    guests && { value: `${num.format(guests)}+`, label: t('trust.guests') },
    years > 0 && { value: String(years), label: t('trust.years', years) },
  ].filter(Boolean) as { value: string; label: string }[]
})
</script>

<template>
  <ul
    v-if="items.length"
    class="grid gap-6 rounded-3xl border border-line bg-white px-6 py-6 sm:gap-0 sm:px-4 lg:py-8"
    :class="items.length > 1 && 'sm:divide-x sm:divide-line'"
    :style="{ '--cols': items.length }"
  >
    <li v-for="item in items" :key="item.label" class="flex items-center gap-4 sm:justify-center sm:px-6">
      <span class="text-4xl font-light leading-none tracking-tight text-rose-dark lg:text-5xl">{{ item.value }}</span>
      <span class="max-w-[11rem] text-sm leading-snug text-muted">{{ item.label }}</span>
    </li>
  </ul>
</template>

<style scoped>
@media (min-width: 640px) {
  ul {
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  }
}
</style>
