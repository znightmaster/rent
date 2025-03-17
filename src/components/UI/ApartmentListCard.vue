<template>
  <div class="w-full max-w-[1400px] h-[400px] flex border rounded-2xl shadow-lg overflow-hidden">

    <div class="w-1/3 h-full">
      <img
        :src="img"
        alt="photo"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="w-2/3 p-6 flex flex-col justify-between">
      <div class="flex flex-col gap-20">
        <h2 class="text-2xl font-bold">{{ data.title }}</h2>
        <p class="text-gray-600 mt-2">{{ data.description }}</p>
        <div class="flex gap-12">
          <p
            v-for="item in data.amenities"
            :key="item">
            {{ item }}
          </p>
        </div>
        <p class="text-xl font-semibold text-teal-600 mt-4">{{ data.price }} KZT</p>

      </div>

      <div class="flex gap-4">
        <router-link :to="`/apartment/${data.id}`">
          <button class="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg">
            Подробнее
          </button>
        </router-link>
        <button
          @click="store.modal = data"
          class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg">
          Забронировать
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/counter.js';

const emit = defineEmits(['chlen']);

const props = defineProps({
  img: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const store = useMainStore();

</script>

<style lang="scss" scoped>

</style>