<script setup lang="ts">
import { formatPrice } from '#shared/utils/format'

const props = withDefaults(defineProps<{ min: number; max: number; step?: number }>(), { step: 1000 })
const model = defineModel<[number, number]>({ required: true })

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi)

// Нижний ползунок не может уйти выше верхнего и наоборот — никаких «перескоков» значений
function setLow(value: string | number) {
  const n = Number(value)
  if (Number.isNaN(n)) return
  model.value = [clamp(n, props.min, model.value[1]), model.value[1]]
}
function setHigh(value: string | number) {
  const n = Number(value)
  if (Number.isNaN(n)) return
  model.value = [model.value[0], clamp(n, model.value[0], props.max)]
}

const span = computed(() => Math.max(props.max - props.min, 1))
const barStyle = computed(() => ({
  left: `${((model.value[0] - props.min) / span.value) * 100}%`,
  width: `${((model.value[1] - model.value[0]) / span.value) * 100}%`,
}))
</script>

<template>
  <div class="flex w-full max-w-[918px] flex-col gap-4">
    <div class="flex gap-4">
      <label class="flex w-1/2 flex-col text-center">
        <span class="text-sm text-muted">{{ $t('apartments.priceFrom') }}</span>
        <input
          type="number"
          :min="min"
          :max="max"
          :step="step"
          :value="model[0]"
          class="field text-center"
          @change="setLow(($event.target as HTMLInputElement).value)"
        />
      </label>
      <label class="flex w-1/2 flex-col text-center">
        <span class="text-sm text-muted">{{ $t('apartments.priceTo') }}</span>
        <input
          type="number"
          :min="min"
          :max="max"
          :step="step"
          :value="model[1]"
          class="field text-center"
          @change="setHigh(($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>

    <div class="relative h-6 w-full">
      <div class="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-line" />
      <div class="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand" :style="barStyle" />
      <input
        type="range"
        class="range-slider"
        :aria-label="$t('apartments.priceMin')"
        :min="min"
        :max="max"
        :step="step"
        :value="model[0]"
        @input="setLow(($event.target as HTMLInputElement).value)"
      />
      <input
        type="range"
        class="range-slider"
        :aria-label="$t('apartments.priceMax')"
        :min="min"
        :max="max"
        :step="step"
        :value="model[1]"
        @input="setHigh(($event.target as HTMLInputElement).value)"
      />
    </div>

    <p class="text-center text-ink">
      {{ $t('apartments.priceRange') }} <span class="font-medium">{{ formatPrice(model[0]) }}</span> —
      <span class="font-medium">{{ formatPrice(model[1]) }}</span>
    </p>
  </div>
</template>

<style scoped>
.range-slider {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  appearance: none;
  background: transparent;
  pointer-events: none;
}
.range-slider::-webkit-slider-thumb {
  pointer-events: all;
  width: 22px;
  height: 22px;
  background: #287888;
  border-radius: 50%;
  cursor: pointer;
  -webkit-appearance: none;
}
.range-slider::-moz-range-thumb {
  pointer-events: all;
  width: 22px;
  height: 22px;
  background: #287888;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}
</style>
