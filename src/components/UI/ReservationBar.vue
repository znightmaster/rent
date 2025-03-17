<template>
  <div
    class="relative flex items-center justify-between max-w-[918px] mb:grid mb:grid-cols-2 mb:items-end mb:grid-rows-2 w-full h-fit gap-16 bg-white/30 backdrop-blur-md rounded-lg space-x-4 p-20">
    <date-picker v-model="date.start" label="Заезд"/>
    <date-picker v-model="date.end" label="Выезд"/>

    <base-select v-model="guest" label="Гости" :list="guestList"/>

    <button
      @click="emit('filter')"
      class="bg-teal-600 text-white px-6 py-2 h-fit rounded-md hover:bg-teal-700 transition">
      Поиск
    </button>
  </div>

</template>

<script setup>
import DatePicker from '@/components/UI/DatePicker.vue';
import { reactive } from 'vue';
import BaseSelect from '@/components/UI/BaseSelect.vue';

const emit = defineEmits(['filter']);

const date = reactive({
  start: null,
  end: null,
});

const guest = defineModel({ required: true });
const guestList = [1, 2, 3, 4, 5];

</script>

<style lang="scss" scoped>

</style>