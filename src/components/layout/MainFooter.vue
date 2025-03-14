<template>
  <div class="flex gap-200 justify-center p-20  ">
    <router-link to="/">
      <img src="../../assets/Logo.png" alt="logo" class="h-100 ml-20"/>
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
      <p>Tel: +7 705 987 01 17</p>
      <p>Email: Dauzer666@gmail.com</p>
      <p></p>
    </div>

  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>