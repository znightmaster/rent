<script setup lang="ts">
import type { Apartment, SearchValue } from '#shared/types'

const { t } = useI18n()
const amenityLabel = useAmenityLabel()

useSeoMeta({
  title: () => t('apartments.seoTitle'),
  description: () => t('apartments.seoDescription'),
})

const route = useRoute()
const router = useRouter()

const queryString = (key: string) => (typeof route.query[key] === 'string' ? (route.query[key] as string) : '')

// Форма поиска ↔ применённый поиск: запрос на сервер уходит только по кнопке «Найти»
const form = ref<SearchValue>({
  from: queryString('from'),
  to: queryString('to'),
  guests: Number(queryString('guests')) || 1,
})
const applied = ref<SearchValue>({ ...form.value })
const searchHint = ref('')

const { data, status, error, refresh } = await useFetch<Apartment[]>('/api/apartments', {
  query: computed(() => ({
    guests: applied.value.guests,
    from: applied.value.from || undefined,
    to: applied.value.to || undefined,
  })),
})

function applySearch() {
  const { from, to } = form.value
  if (Boolean(from) !== Boolean(to)) {
    searchHint.value = t('search.bothDates')
    return
  }
  searchHint.value = ''
  applied.value = { ...form.value }
  // Ссылку на результаты можно скопировать и отправить
  router.replace({
    query: {
      guests: applied.value.guests,
      ...(applied.value.from && applied.value.to ? { from: applied.value.from, to: applied.value.to } : {}),
    },
  })
}

// --- Клиентские фильтры: цена, удобства, сортировка (применяются сразу) ---
const list = computed(() => data.value ?? [])

const bounds = computed(() => {
  const prices = list.value.map((a) => a.price)
  if (!prices.length) return { min: 0, max: 0 }
  return {
    min: Math.floor(Math.min(...prices) / 1000) * 1000,
    max: Math.ceil(Math.max(...prices) / 1000) * 1000,
  }
})

const range = ref<[number, number] | null>(null) // null = весь диапазон
const effectiveRange = computed<[number, number]>(() => range.value ?? [bounds.value.min, bounds.value.max])
watch(bounds, () => {
  range.value = null // после нового поиска диапазон считается заново
})

// Теги берём из реальных данных: добавили удобство — фильтр появился сам
const allTags = computed(() => [...new Set(list.value.flatMap((a) => a.amenities))])
const tags = ref<string[]>([])
const sort = ref<'asc' | 'desc'>('asc')

const filtered = computed(() => {
  const [min, max] = effectiveRange.value
  return list.value
    .filter((a) => a.price >= min && a.price <= max && tags.value.every((t) => a.amenities.includes(t)))
    .sort((a, b) => (sort.value === 'asc' ? a.price - b.price : b.price - a.price))
})

const filtersOpen = ref(false)
const activeFilters = computed(() => (range.value ? 1 : 0) + tags.value.length)
function resetFilters() {
  range.value = null
  tags.value = []
}

const preset = computed(() => ({ from: applied.value.from, to: applied.value.to, guests: applied.value.guests }))
</script>

<template>
  <div class="container-page py-6 lg:py-10">
    <h1 class="text-4xl lg:text-6xl">{{ t('apartments.title') }}</h1>
    <p class="mt-4 max-w-md text-lg text-muted">{{ t('apartments.lead') }}</p>

    <div class="mt-8 max-w-3xl">
      <ReservationBar v-model="form" @search="applySearch" />
      <p v-if="searchHint" class="mt-2 text-sm text-red-700" role="alert">{{ searchHint }}</p>
    </div>

    <!-- Панель: количество, фильтры, сортировка -->
    <div class="mt-12 flex flex-wrap items-center justify-between gap-3">
      <p class="text-xl" aria-live="polite">
        <template v-if="status !== 'pending'">{{ t('apartments.found', filtered.length) }}</template>
      </p>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn-secondary !min-h-[2.75rem] !px-5"
          :class="filtersOpen && '!border-rose !bg-rose-soft !text-rose-dark'"
          :aria-expanded="filtersOpen"
          aria-controls="filters-panel"
          @click="filtersOpen = !filtersOpen"
        >
          <svg class="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
            <circle cx="16" cy="7" r="2" />
            <circle cx="10" cy="17" r="2" />
          </svg>
          {{ t('apartments.filters') }}<span v-if="activeFilters" class="ml-2 rounded-full bg-rose-dark px-2 text-sm text-white">{{ activeFilters }}</span>
        </button>
        <label class="sr-only" for="sort">{{ t('apartments.sort') }}</label>
        <select id="sort" v-model="sort" class="field !w-auto !min-h-[2.75rem] !rounded-full !border-rose/50 !py-2">
          <option value="asc">{{ t('apartments.sortAsc') }}</option>
          <option value="desc">{{ t('apartments.sortDesc') }}</option>
        </select>
      </div>
    </div>

    <!-- Фильтры: карточка с ценой и удобствами -->
    <Transition name="drop">
      <div
        v-if="filtersOpen"
        id="filters-panel"
        class="mt-4 grid gap-8 rounded-3xl border border-line bg-white p-6 md:grid-cols-2 md:gap-12 lg:p-8"
      >
        <div v-if="bounds.max > bounds.min" class="flex flex-col gap-3">
          <p class="font-medium">{{ t('apartments.priceTitle') }}</p>
          <PriceRange
            :model-value="effectiveRange"
            :min="bounds.min"
            :max="bounds.max"
            @update:model-value="range = $event"
          />
        </div>
        <div v-if="allTags.length" class="flex flex-col gap-3">
          <p class="font-medium">{{ t('apartments.amenitiesTitle') }}</p>
          <TagFilter v-model="tags" :tags="allTags" :label="amenityLabel" />
        </div>
        <button v-if="activeFilters" type="button" class="text-link w-fit md:col-span-2" @click="resetFilters">{{ t('apartments.reset') }}</button>
      </div>
    </Transition>

    <!-- Загрузка -->
    <div v-if="status === 'pending'" class="mt-8 grid gap-6 md:grid-cols-2" aria-busy="true">
      <div v-for="n in 2" :key="n" class="flex flex-col gap-5 rounded-3xl border border-line bg-white p-3">
        <div class="aspect-[4/3] animate-pulse rounded-2xl bg-mist" />
        <div class="mx-3 mb-3 h-32 animate-pulse rounded-2xl bg-mist" />
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="mt-8 flex flex-col items-start gap-4 rounded-3xl bg-mist p-8" role="alert">
      <p class="text-xl">{{ t('apartments.loadError') }}</p>
      <button type="button" class="btn-primary" @click="refresh()">{{ t('apartments.retry') }}</button>
    </div>

    <!-- Пусто -->
    <div v-else-if="!filtered.length" class="mt-8 flex flex-col items-start gap-4 rounded-3xl bg-rose-soft p-8 lg:p-10">
      <p class="text-2xl">{{ t('apartments.emptyTitle') }}</p>
      <p class="max-w-md text-muted">{{ t('apartments.emptyText') }}</p>
      <div class="flex flex-wrap gap-3">
        <button v-if="activeFilters" type="button" class="btn-secondary" @click="resetFilters">{{ t('apartments.reset') }}</button>
        <a :href="site.telegram" target="_blank" rel="noopener noreferrer" class="btn-primary">{{ t('common.writeTelegram') }}</a>
      </div>
    </div>

    <!-- Список: сетка карточек -->
    <ul v-else class="mt-8 grid gap-6 md:grid-cols-2">
      <li v-for="apartment in filtered" :key="apartment.id">
        <ApartmentCard :apartment="apartment" :preset="preset" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.drop-enter-active,
.drop-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
</style>
