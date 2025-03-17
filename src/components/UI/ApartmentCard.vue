<template>
  <div class="flex flex-col items-center gap-5 justify-center w-full px-4">

    <apartment-list-card
      v-for="(item, index) in store.apartment"
      :key="index"
      :data="item"
      img="/img/Banner8.png"
      @chlen="openModal"/>

    <apartment-modal

      v-model="modal"/>
  </div>
</template>

<script setup>
import ApartmentListCard from '@/components/UI/ApartmentListCard.vue';
import { ref } from 'vue';
import ApartmentModal from '@/components/UI/ApartmentModal.vue';
import { useMainStore } from '@/stores/counter.js';

const store = useMainStore();

const apartmentList = ['/img/Banner8.png', '/img/Banner9.png', '/img/Banner10.png', '/img/Banner11.png', '/img/Banner12.png'];

const modal = ref(null);

const openModal = (value) => {
  modal.value = value;
};

</script>

<style lang="scss" scoped>

</style>

