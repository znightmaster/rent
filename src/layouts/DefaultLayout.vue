<template>
  <div class="flex flex-col min-h-screen">
    <main-header/>
    <main class="flex flex-col flex-grow">
      <router-view/>
    </main>
    <main-footer/>
    <apartment-modal v-if="store.modal"/>
  </div>
</template>

<script setup>

import MainHeader from '@/components/layout/MainHeader.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
import { useMainStore } from '@/stores/counter.js';
import ApartmentModal from '@/components/UI/ApartmentModal.vue';

const store = useMainStore();
</script>

<style lang="scss" scoped>

</style>