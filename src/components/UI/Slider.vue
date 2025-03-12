<template>
  <swiper
    :modules="[Navigation, Pagination]"
    :slides-per-view="1"
    :navigation="true"
    :pagination="{ clickable: true }"
    class="w-full h-fit"
  >
    <swiper-slide v-for="(item, index) in slides" :key="index" class="flex">
      <!--      <div class="grid grid-cols-2 sm:grid-cols-1 h-full border rounded-2xl shadow-lg overflow-hidden">-->
      <!--        <div class="w-full h-full">-->
      <!--          <img :src= alt="Фото" class="w-full h-full object-cover"/>-->
      <!--        </div>-->
      <!--        <div class="w-full h-full p-6 flex flex-col justify-between">-->
      <!--          <h2 class="text-2xl font-bold">{{ item.title }}</h2>-->
      <!--          <p class="text-gray-600 mt-2">{{ item.description }}</p>-->
      <!--          <p class="text-xl font-semibold text-teal-600 mt-4">{{ item.price }} ₽</p>-->
      <!--          <div class="flex gap-4">-->
      <!--            <button class="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg">Подробнее</button>-->
      <!--            <button class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg">Забронировать</button>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <apartment-list-card :img="item.image">

      </apartment-list-card>

      <!--      <div class="w-1/3 h-full">-->
      <!--        <img-->
      <!--          :src="item.image"-->
      <!--          alt="photo"-->
      <!--          class="w-full h-full object-cover"-->
      <!--        />-->
      <!--      </div>-->

      <!--      <div class="w-2/3 p-6 flex flex-col justify-between">-->
      <!--        <div>-->
      <!--          <h2 class="text-2xl font-bold">Квартира</h2>-->
      <!--          <p class="text-gray-600 mt-2">-->
      <!--            Квартира оснащена абсолютно всем необходимым для комфортного проживания вдали от дома: → Свежее,-->
      <!--            качественное, выглаженное постельное белье и полотенца; → Одноразовые тапочки и зубные наборы; → Большой-->
      <!--            SMART-TV с выходом в интернет; → Новый дизайнерский ремонт в современном стиле; → Большая, удобная кровать-->
      <!--          </p>-->
      <!--          <p class="text-xl font-semibold text-teal-600 mt-4">20 000 KZt</p>-->
      <!--        </div>-->

      <!--        <div class="flex gap-4">-->
      <!--          <router-link to="/apartment">-->
      <!--            <button class="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg">-->
      <!--              Подробнее-->
      <!--            </button>-->
      <!--          </router-link>-->
      <!--          <button-->
      <!--            @click="openModal"-->
      <!--            class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg">-->
      <!--            Забронировать-->
      <!--          </button>-->
      <!--        </div>-->
      <!--      </div>-->

    </swiper-slide>
  </swiper>
  <apartment-modal v-model="modal"/>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ApartmentModal from '@/components/UI/ApartmentModal.vue';
import { ref } from 'vue';
import ApartmentListCard from '@/components/UI/ApartmentListCard.vue';

export default {
  components: { ApartmentListCard, ApartmentModal, Swiper, SwiperSlide },
  setup() {
    const modal = ref(false);

    const openModal = () => {
      modal.value = true;
    };

    const slides = [
      {
        image: '/img/Banner8.png',
        title: 'Квартира',
        description: 'Квартира оснащена абсолютно всем необходимым для комфортного проживания вдали от дома...',
        price: '20 000',
      },
      {
        image: '/img/Banner9.png',
        title: 'Квартира',
        description: 'Квартира оснащена абсолютно всем необходимым для комфортного проживания вдали от дома...',
        price: '20 000',
      },
      {
        image: '/img/Banner10.png',
        title: 'Квартира',
        description: 'Квартира оснащена абсолютно всем необходимым для комфортного проживания вдали от дома...',
        price: '20 000',
      },
    ];

    return { slides, modal, openModal, Navigation, Pagination };
  },
};
</script>