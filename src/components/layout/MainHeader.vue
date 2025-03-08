<template>
  <div class="sticky top-0 z-20 flex justify-between items-center p-2  bg-white/30 backdrop-blur-md">
    <router-link to="/">
      <img src="../../assets/Logo.png" alt="logo" class="h-100 ml-20"/>
    </router-link>

    <div class="flex items-center gap-60 w-704 font-400 text-xl mr-20">

      <router-link to="/about">
        О нас
      </router-link>
      <router-link to="/apartment">
        Шаблон
      </router-link>
      <router-link to="/rent-list">
        Апартаменты
      </router-link>
      <router-link to="/log-in" class="">
        <login-button/>
      </router-link>
    </div>

  </div>

</template>

<script setup>

import LoginButton from '@/components/UI/LoginButton.vue';
</script>

<style lang="scss" scoped>

</style>