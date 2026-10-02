<script setup lang="ts">
import type { SearchValue } from '#shared/types'
import { addDaysISO, todayISO } from '#shared/utils/date'

const model = defineModel<SearchValue>({ required: true })
const props = withDefaults(defineProps<{ maxGuests?: number }>(), { maxGuests: 5 })
const emit = defineEmits<{ search: [] }>()

const today = todayISO()
const guestOptions = computed(() => Array.from({ length: props.maxGuests }, (_, i) => i + 1))
const minTo = computed(() => addDaysISO(model.value.from || today, 1))

const from = computed({
  get: () => model.value.from,
  set: (value: string) => {
    const next = { ...model.value, from: value }
    // Если выезд оказался раньше нового заезда — сбрасываем его, а не оставляем «битые» даты
    if (next.to && next.to <= value) next.to = ''
    model.value = next
  },
})
const to = computed({
  get: () => model.value.to,
  set: (value: string) => {
    model.value = { ...model.value, to: value }
  },
})
const guests = computed({
  get: () => model.value.guests,
  set: (value: number | string) => {
    model.value = { ...model.value, guests: Number(value) }
  },
})
</script>

<template>
  <!-- gap-px на фоне цвета линии даёт тонкие разделители между полями -->
  <form
    class="grid w-full grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-[0_24px_60px_-34px_rgba(36,52,59,0.45)] lg:grid-cols-[1fr_1fr_0.7fr_auto]"
    @submit.prevent="emit('search')"
  >
    <label class="flex flex-col gap-0.5 bg-white px-5 py-3 transition focus-within:bg-rose-soft/60">
      <span class="text-sm text-muted">Заезд</span>
      <input v-model="from" type="date" :min="today" class="field-bare" />
    </label>

    <label class="flex flex-col gap-0.5 bg-white px-5 py-3 transition focus-within:bg-rose-soft/60">
      <span class="text-sm text-muted">Выезд</span>
      <input v-model="to" type="date" :min="minTo" class="field-bare" />
    </label>

    <label class="flex flex-col gap-0.5 bg-white px-5 py-3 transition focus-within:bg-rose-soft/60">
      <span class="text-sm text-muted">Гости</span>
      <select v-model="guests" class="field-bare">
        <option v-for="n in guestOptions" :key="n" :value="n">{{ n }}</option>
      </select>
    </label>

    <div class="flex items-stretch bg-white p-2">
      <button type="submit" class="btn-primary w-full lg:px-8">Найти</button>
    </div>
  </form>
</template>
