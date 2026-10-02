<script setup lang="ts">
import type { Apartment, SearchValue } from '#shared/types'

useSeoMeta({
  title: 'Квартиры',
  description: 'Дизайнерские гостевые квартиры в Павлодаре: выбирайте по датам, цене и удобствам.',
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
    searchHint.value = 'Укажите обе даты — заезд и выезд — или очистите их.'
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
    <h1 class="text-4xl lg:text-5xl">Квартиры</h1>

    <div class="mt-8 max-w-3xl">
      <ReservationBar v-model="form" @search="applySearch" />
      <p v-if="searchHint" class="mt-2 text-sm text-red-700" role="alert">{{ searchHint }}</p>
    </div>

    <!-- Панель: количество, фильтры, сортировка -->
    <div class="mt-10 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
      <p class="text-muted" aria-live="polite">
        <template v-if="status !== 'pending'">Найдено: {{ filtered.length }}</template>
      </p>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="btn-secondary !min-h-[2.75rem] !px-5"
          :aria-expanded="filtersOpen"
          aria-controls="filters-panel"
          @click="filtersOpen = !filtersOpen"
        >
          Фильтры<span v-if="activeFilters" class="ml-2 rounded-full bg-brand px-2 text-sm text-white">{{ activeFilters }}</span>
        </button>
        <label class="sr-only" for="sort">Сортировка</label>
        <select id="sort" v-model="sort" class="field !w-auto !min-h-[2.75rem] !rounded-full !py-2">
          <option value="asc">Сначала дешевле</option>
          <option value="desc">Сначала дороже</option>
        </select>
      </div>
    </div>

   <!-- Высота плавно «раскрывается» (трюк с grid-rows 0fr → 1fr), содержимое проявляется -->
    <div
      id="filters-panel"
      class="grid transition-[grid-template-rows] duration-500 ease-out"
      :class="filtersOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      :aria-hidden="!filtersOpen"
      :inert="!filtersOpen"
    >
      <div class="overflow-hidden">
        <div
          class="flex flex-col gap-6 border-b border-line py-6 transition-opacity duration-500"
          :class="filtersOpen ? 'opacity-100' : 'opacity-0'"
        >
          <div v-if="bounds.max > bounds.min" class="max-w-xl">
            <PriceRange
              :model-value="effectiveRange"
              :min="bounds.min"
              :max="bounds.max"
              @update:model-value="range = $event"
            />
          </div>
          <TagFilter v-if="allTags.length" v-model="tags" :tags="allTags" />
          <button v-if="activeFilters" type="button" class="text-link w-fit" @click="resetFilters">Сбросить фильтры</button>
        </div>
      </div>
    </div>

    <!-- Загрузка -->
    <div v-if="status === 'pending'" class="divide-y divide-line" aria-busy="true">
      <div v-for="n in 2" :key="n" class="grid gap-5 py-8 md:grid-cols-[5fr_6fr] md:gap-10">
        <div class="aspect-[4/3] animate-pulse rounded-3xl bg-mist" />
        <div class="h-40 animate-pulse rounded-3xl bg-mist" />
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="flex flex-col items-start gap-4 py-12" role="alert">
      <p class="text-xl">Не удалось загрузить квартиры.</p>
      <button type="button" class="btn-primary" @click="refresh()">Повторить</button>
    </div>

    <!-- Пусто -->
    <div v-else-if="!filtered.length" class="flex flex-col items-start gap-4 py-12">
      <p class="text-xl">Свободных квартир не нашлось.</p>
      <p class="max-w-md text-muted">Попробуйте другие даты, меньше гостей или сбросьте фильтры.</p>
      <button v-if="activeFilters" type="button" class="btn-secondary" @click="resetFilters">Сбросить фильтры</button>
    </div>

    <!-- Список -->
    <ul v-else class="divide-y divide-line">
      <li v-for="apartment in filtered" :key="apartment.id" v-reveal>
        <ApartmentCard :apartment="apartment" :preset="preset" />
      </li>
    </ul>
  </div>
</template>
