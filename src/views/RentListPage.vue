<template>
  <ReservationBar @filter="updateList" class="mx-auto z-10" v-model="guest"/>

  <DoubleRangeSlider
    v-model:min="range.min"
    v-model:max="range.max"
    class="mx-auto"/>

  <ApartmentCard v-if="currentList" :data="currentList"/>
</template>

<script setup>
import ApartmentCard from '@/components/UI/ApartmentCard.vue';
import ReservationBar from '@/components/UI/ReservationBar.vue';
import { useMainStore } from '@/stores/counter.js';
import { onMounted, reactive, ref } from 'vue';
import DoubleRangeSlider from '@/components/UI/DoubleRangeSlider.vue';

const store = useMainStore();

const range = reactive({
  min: 30000,
  max: 120000,
});

const guest = ref(1);

const currentList = ref(null);

const updateList = () => {
  currentList.value = store.apartment.filter((item) => {
    return item.price >= range.min
      && item.price <= range.max
      && item.tenant_limit >= guest.value;
  });
};

onMounted(async () => {
  if (!store.apartment) {
    await store.getApartment();
  }
  currentList.value = store.apartment;
});

</script>

<style lang="scss" scoped></style>
