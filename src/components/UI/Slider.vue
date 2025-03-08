<template>
  <swiper
    :modules="[Navigation, Pagination]"
    :slides-per-view="1"
    :navigation="true"
    :pagination="{ clickable: true }"
    class="w-full h-fit"
  >
    <swiper-slide v-for="(item, index) in slides" :key="index">
      <div class="grid grid-cols-2 sm:grid-cols-1 h-full border rounded-2xl shadow-lg overflow-hidden">
        <div class="w-full h-full">
          <img :src="item.image" alt="Фото" class="w-full h-full object-cover"/>
        </div>
        <div class="w-full h-full p-6 flex flex-col justify-between">
          <h2 class="text-2xl font-bold">{{ item.title }}</h2>
          <p class="text-gray-600 mt-2">{{ item.description }}</p>
          <p class="text-xl font-semibold text-teal-600 mt-4">{{ item.price }} ₽</p>
          <div class="flex gap-4">
            <button class="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg">Подробнее</button>
            <button class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg">Забронировать</button>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  components: { Swiper, SwiperSlide },
  setup() {
    const slides = [
      {
        image: '/src/assets/Banner8.png',
        title: 'Квартира',
        description: 'Квартира оснащена абсолютно всем необходимым для комфортного проживания вдали от дома: → Свежее, качественное, выглаженное постельное белье и полотенца; → Одноразовые тапочки и зубные наборы;  → Большой SMART-TV с выходом в интернет;  → Новый дизайнерский ремонт в современном стиле; → Большая, удобная кровать',
        price: '20 000',
      },
      {
        image: '/src/assets/Banner9.png',
        title: 'Квартира',
        description: 'Квартира оснащена абсолютно всем необходимым для комфортного проживания вдали от дома: → Свежее, качественное, выглаженное постельное белье и полотенца; → Одноразовые тапочки и зубные наборы;  → Большой SMART-TV с выходом в интернет;  → Новый дизайнерский ремонт в современном стиле; → Большая, удобная кровать',
        price: '20 000',
      },
      {
        image: '/src/assets/Banner10.png',
        title: 'Квартира',
        description: 'Квартира оснащена абсолютно всем необходимым для комфортного проживания вдали от дома: → Свежее, качественное, выглаженное постельное белье и полотенца; → Одноразовые тапочки и зубные наборы;  → Большой SMART-TV с выходом в интернет;  → Новый дизайнерский ремонт в современном стиле; → Большая, удобная кровать',
        price: '20 000',
      },
    ];
    return { slides, Navigation, Pagination };
  },
};
</script>