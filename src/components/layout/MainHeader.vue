<template>
  <div class="sticky top-0 z-20 flex justify-between items-center p-2  bg-white/30 backdrop-blur-md">
    <router-link to="/">
      <img src="../../assets/Logo.png" alt="logo" class="h-100 ml-20"/>
    </router-link>

    <div class="flex items-center gap-60 w-704 font-400 text-xl mr-20">

      <router-link to="/about">
        О нас
      </router-link>
      <router-link to="/rent-list">
        Апартаменты
      </router-link>
    </div>

  </div>

</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>