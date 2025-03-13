<template>
  <div class="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg">
    <h2 class="text-3xl font-bold text-center text-teal-600 mb-6">
      Отзывы наших клиентов
    </h2>
    <Swiper
      :modules="[Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="20"
      :pagination="{ clickable: true }"
      :loop="true"
      :autoplay="{ delay: 4000 }"
      class="w-full"
    >
      <SwiperSlide v-for="(review, index) in reviews" :key="index">
        <div class="p-6 bg-teal-600 text-white rounded-lg shadow-md">
          <p class="text-lg italic">"{{ review.text }}"</p>
          <div class="mt-4 text-right font-semibold">{{ review.author }}</div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Данные с отзывами
const reviews = [
  { text: "Прекрасное место! Чистота, уют и дружелюбный персонал.", author: "Анастасия К." },
  { text: "Очень уютные апартаменты, все новое и чистое!", author: "Дмитрий П." },
  { text: "Лучший сервис, который я встречал. Всё на высшем уровне!", author: "Елена С." },
  { text: "Останавливались на выходные, понравилось абсолютно всё!", author: "Максим В." },
  { text: "Дизайн квартиры — просто шик! Вернёмся снова!", author: "Ольга Т." },
  { text: "Отличное расположение, рядом магазины и транспорт!", author: "Андрей Л." },
  { text: "Рекомендую! Чистота, удобные кровати, отличный вид из окна.", author: "Мария И." },
  { text: "Персонал очень отзывчивый, помогли с заселением без проблем.", author: "Иван Г." }
];
</script>

<style scoped>
/* Стилизация пагинации Swiper */
.swiper-pagination-bullet {
  background-color: #0d9488 !important; /* teal-600 */
}
</style>
