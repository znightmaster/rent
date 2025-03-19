<template>
  <swiper
    :modules="[Navigation, Pagination]"
    :slides-per-view="1"
    :navigation="true"
    :pagination="{ clickable: true }"
  >
    <swiper-slide v-for="(item, index) in store.apartment" :key="index">

      <apartment-list-card img="/img/Banner8.png" class="justify-self-center flex top-5" :data="item">
      </apartment-list-card>

    </swiper-slide>
  </swiper>
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
import { useMainStore } from '@/stores/counter.js';

export default {
  components: { ApartmentListCard, ApartmentModal, Swiper, SwiperSlide },
  setup() {
    const modal = ref(false);

    const store = useMainStore();

    const openModal = () => {
      modal.value = true;
    };

    return { openModal, Navigation, Pagination, store };
  },
};
</script>