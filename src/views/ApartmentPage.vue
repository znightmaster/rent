<template>
  <div v-if="currentApartment" class="grid grid-cols-2 sm:grid-cols-1 p-20 gap-20">
    <image-preview-picker :list="imageList"/>
    <div class="flex flex-col w-full gap-20">
      <div class="flex flex-col gap-20 py-40 px-80 bg-gray-300 rounded-8">
        <apartment-button @click="store.modal = currentApartment">Забронировать номер</apartment-button>
        <apartment-button>Смотреть видео</apartment-button>
      </div>
      <div class="flex flex-col gap-20">
        <h2 class="text-2xl font-bold">{{ currentApartment.title }}</h2>
        <h1 class="text-1xl">{{ currentApartment.address }}</h1>
        <p class="text-gray-600 mt-2">{{ currentApartment.description }}</p>
        <div class="flex gap-12">
          <p
            v-for="item in currentApartment.amenities"
            :key="item">
            {{ item }}
          </p>
        </div>
        <p class="text-xl font-semibold text-teal-600 mt-4">{{ currentApartment.price }} KZT</p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import ImagePreviewPicker from '@/components/UI/ImagePreviewPicker.vue';
import ApartmentButton from '@/components/UI/ApartmentButton.vue';
import { useMainStore } from '@/stores/counter.js';
import { useRoute } from 'vue-router';

const route = useRoute();

const store = useMainStore();
onMounted(() => {
  !store.apartment && store.getApartment();
});
const currentApartment = computed(() => {
  return store.apartment
    ? store.apartment.find(x => x.id == route.params.id)
    : null;
});

const imageList = [
  '/img/Banner8.png',
  '/img/Banner10.png',
  '/img/Banner11.png',
];

</script>

<style lang="scss" scoped>
.show-x-enter-from, .show-x-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.show-x-enter-active, .show-x-leave-active {
  transition: all 0.5s ease;
}
</style>
