<template>
  <div class="p-20">
    <div
      class="relative top-0 min-h-screen h-full w-full bg-cover bg-no-repeat rounded-16 bg-[url('@/assets/Banner10.png')]">
      <div class="absolute min-w-[490] min-h-[250px] top-60 left-32">
        <div class="flex text-[4vw]">
          Уют, в который<br>
          хочется возвращаться
        </div>
        <div class="flex text-[2vw] mt-10">
          We provide a complete service for sale,<br>
          purchase or rental of real estate.
        </div>
      </div>
      <div class="relative flex justify-center items-center min-h-screen px-40 sm:px-16 w-full">
        <ReservationBar/>
      </div>
    </div>

    <div class="mt-40">
      <Slider v-if="store.apartment"/>
    </div>

    <div class="flex items-center gap-5 px-4 py-10">

      <iframe
        class="relative p-10 w-1/2 h-[500px] rounded-xl shadow-lg"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A493aa14c26fdb7e1a31148495175e446981416d427129068e5343bb9f7f4f4f8&amp;source=constructor">
      </iframe>

      <ReviewSlider/>

    </div>
  </div>
</template>

<script setup>
import ReservationBar from '@/components/UI/ReservationBar.vue';
import Slider from '@/components/UI/Slider.vue';
import ReviewSlider from '@/components/UI/ReviewSlider.vue';
import { onMounted } from 'vue';
import { useMainStore } from '@/stores/counter.js';

const store = useMainStore();
onMounted(() => {
  !store.apartment && store.getApartment();
});
</script>

<style lang="scss" scoped>
</style>
