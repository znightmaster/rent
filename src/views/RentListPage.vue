<template>
  <ReservationBar class="mx-auto z-10"/>
  <DoubleRangeSlider class="mx-auto"/>
  <ApartmentCard v-if="store.apartment"/>
</template>

<script setup>
import ApartmentCard from '@/components/UI/ApartmentCard.vue';
import ReservationBar from '@/components/UI/ReservationBar.vue';
import DoubleRangeSlider from '@/components/UI/DoubleRangeSlider.vue';
import { useMainStore } from '@/stores/counter.js';
import { onMounted } from 'vue';
import axios from 'axios';

const store = useMainStore();
onMounted(() => {
  !store.apartment && store.getApartment();
});

</script>

<style lang="scss" scoped></style>
