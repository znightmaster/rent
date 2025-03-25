<template>
  <div class="flex gap-4 w-full max-w-100">
    <div class="flex flex-col gap-4 w-full">
      <select v-model="selectedHour"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
        <option v-for="hour in hours" :key="hour" :value="hour">
          {{ hour }}
        </option>
      </select>
    </div>
    <div class="flex flex-col gap-4 w-full">
      <select v-model="selectedMinute"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
        <option v-for="minute in minutes" :key="minute" :value="minute">
          {{ minute }}
        </option>
      </select>
    </div>
  </div>

</template>

<script setup>
import { computed, ref } from 'vue';

const selectedHour = ref('00');
const selectedMinute = ref('00');

const hours = computed(() => Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')));
const minutes = ['00', '30'];
</script>

<style lang="scss" scoped>

</style>