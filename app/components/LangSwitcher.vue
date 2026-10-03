<script setup lang="ts">
// Переключатель языка: «таблетка» с пудровой подложкой, которая переезжает под выбранный язык
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const short: Record<string, string> = { ru: 'RU', en: 'EN', kk: 'KZ' }
const items = computed(() => locales.value.map((l) => (typeof l === 'string' ? { code: l, name: l } : l)))
const index = computed(() => Math.max(0, items.value.findIndex((l) => l.code === locale.value)))
</script>

<template>
  <nav
    :aria-label="t('header.language')"
    class="relative grid rounded-full border border-line bg-white p-1 text-sm"
    :style="{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }"
  >
    <span
      class="absolute inset-y-1 left-1 rounded-full bg-rose-soft transition-transform duration-300 ease-out"
      :style="{ width: `calc((100% - 0.5rem) / ${items.length})`, transform: `translateX(${index * 100}%)` }"
      aria-hidden="true"
    />
    <NuxtLink
      v-for="l in items"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      :lang="l.code"
      :title="l.name"
      :aria-label="l.name"
      :aria-current="l.code === locale ? 'true' : undefined"
      class="relative flex h-9 w-9 items-center justify-center rounded-full font-medium transition"
      :class="l.code === locale ? 'text-rose-dark' : 'text-muted hover:text-ink'"
    >
      {{ short[l.code] ?? l.code.toUpperCase() }}
    </NuxtLink>
  </nav>
</template>
