<template>
  <div class="flex gap-100 justify-center p-68">
    <router-link to="/">
      <goodHome />
    </router-link>
    <div class="flex flex-col gap-2">
      <router-link to="/about">
        О нас
      </router-link>
      <router-link to="/rent-list">
        Апартаменты
      </router-link>
    </div>
    <div class="flex flex-col gap-2">
      <p>Контакты</p>
      <label for="" class="flex">
        <img src="/telephone.png" alt="">
        <a href="">: +7 705 987 01 17</a>
      </label>
      <label for="" class="flex">
        <img src="/mail.png" alt="">
        <a href="">: dauzer666@gmail.com</a>
      </label>

    </div>
    <div class="flex gap-6 items-center">
      <instagram />
      <whatsapp />
      <booking />

    </div>

  </div>
</template>

<script setup>

import Instagram from '@/components/Icons/instagram.vue';
import Whatsapp from '@/components/Icons/whatsapp.vue';
import Booking from '@/components/Icons/booking.vue';
import GoodHome from '@/components/Icons/goodHome.vue';
</script>

<style lang="scss" scoped>

</style>