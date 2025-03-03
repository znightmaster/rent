<template>
  <div class="p-20 ">
    <div class="relative top-0
    min-h-screen
    h-full
    w-full
    bg-contain
    bg-no-repeat
    rounded-16
    bg-[url('@/assets/Banner.png')]">
      <div class="relative w-490 h-257 top-60 left-32">
        <div class="flex text-[5vw] ">
          Easy way to find a<br>
          perfect property
        </div>
        <div class="flex text-[2vw] mt-10">
          We provide a complete service for sale,<br>
          purchase or rental of real estate.
        </div>

      </div>
      <ReservationBar />

    </div>


  </div>
</template>

<script setup>

import ReservationBar from '@/components/UI/ReservationBar.vue';
</script>

<style lang="scss" scoped>

</style>