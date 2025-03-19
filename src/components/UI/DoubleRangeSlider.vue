<template>
  <div
    class="relative flex flex-col items-center justify-between max-w-[918px] w-full h-fit gap-16  rounded-lg space-x-4 p-20">

    <div class="flex gap-10 w-full">
      <div class="flex flex-col text-center w-1/2">
        <label class="text-sm text-gray-600">От</label>
        <input
          v-model="min"
          type="number"
          min="30000" max="120000" step="1000"
          class="border p-2 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
      <div class="flex flex-col text-center w-1/2">
        <label class="text-sm text-gray-600">До</label>
        <input
          v-model="max"
          type="number"
          min="30000" max="120000" step="1000"
          class="border p-2 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
    </div>

    <div class="relative w-full mt-6">
      <div class="absolute w-full h-2 bg-gray-300 rounded top-1/2 -translate-y-1/2"></div>
      <div class="absolute h-2 bg-teal-600 rounded top-1/2 -translate-y-1/2" :style="barStyle"></div>

      <input type="range"
             class="range-slider"
             min="30000" max="120000" step="1000"
             v-model="min"
             @input="updateBar"/>

      <input type="range"
             class="range-slider"
             min="30000" max="120000" step="1000"
             v-model="max"
             @input="updateBar"/>
    </div>

    <p class="text-center text-gray-700 mt-4">
      Выбранный диапазон: <span class="font-semibold">{{ min }} KZT</span> — <span
      class="font-semibold">{{ max }} KZT</span>
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const min = defineModel('min', { required: true });
const max = defineModel('max', { required: true });

const barStyle = computed(() => {
  const minPercent = ((min.value - 30000) / (120000 - 30000)) * 100;
  const maxPercent = ((max.value - 30000) / (120000 - 30000)) * 100;
  return {
    left: `${minPercent}%`,
    width: `${maxPercent - minPercent}%`,
  };
});

const updateBar = () => {
  if (parseInt(min.value) > parseInt(max.value)) {
    const temp = min.value;
    min.value = max.value;
    max.value = temp;
  }
};
</script>

<style scoped>
.range-slider {
  position: absolute;
  width: 100%;
  appearance: none;
  background: transparent;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
}


.range-slider::-webkit-slider-thumb {
  pointer-events: all;
  width: 20px;
  height: 20px;
  background: teal;
  border-radius: 30%;
  cursor: pointer;
  -webkit-appearance: none;
}

.range-slider::-moz-range-thumb {
  pointer-events: all;
  width: 20px;
  height: 20px;
  background: teal;
  border-radius: 10%;
  cursor: pointer;
}
</style>
