<template>
  <div class="sticky top-20 z-20 flex justify-between items-center p-20">
    <a href="">
      <img src="../../assets/Logo.png" alt="logo" class="h-9" />
    </a>
    <div class="flex items-center gap-60 w-704 h-9 font-300 text-sm">
      <MainPage />
      <AboutPage />
      <RentListPage />
      <LogIn />
    </div>


  </div>
  <div>
  <img src="../../assets/Banner.png" alt="" class="p-20">

  </div>
</template>

<script setup>
import MainPage from '@/views/MainPage.vue';
import AboutPage from '@/views/AboutPage.vue';
import RentListPage from '@/views/RentListPage.vue';
import LogIn from '@/views/LogIn.vue';

</script>

<style lang="scss" scoped>

</style>