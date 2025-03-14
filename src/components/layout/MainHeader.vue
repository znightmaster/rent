<template>
  <div class="sticky top-0 z-20 flex justify-between items-center p-2  bg-white/30 backdrop-blur-md">
    <router-link to="/">
      <img src="../../assets/Logo.png" alt="logo" class="h-100 ml-20"/>
    </router-link>

    <div class="flex items-center gap-40 w-704 font-400 text-xl mr-20">
      <a
        href="https://www.instagram.com/goodhome.pvl/"
        target="_blank"
        class=""
      >
        <img src="/instagram.png" alt=""/>
      </a>
      <a
        href="https://wa.me/77059870117"
        target="_blank"
        class=""
      >
        <img src="/whatsapp.png" alt=""/>
      </a>


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