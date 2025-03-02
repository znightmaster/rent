<template>
  <div class="sticky top-0 z-20 flex justify-between items-center p-20">
    <router-link to="/">
      <img src="../../assets/Logo.png" alt="logo" class="h-9" />
    </router-link>

    <div class="flex items-center gap-60 w-704 h-9 font-300 text-sm">

      <router-link to="/about">
        О нас
      </router-link>
      <router-link to="/contact">
        Контакты
      </router-link>
      <router-link to="/log-in" class="">
        <login-button />
      </router-link>
    </div>

  </div>


</template>

<script setup>

import LoginButton from '@/components/UI/LoginButton.vue';
</script>

<style lang="scss" scoped>

</style>