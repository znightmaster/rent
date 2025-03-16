<template>
  <div class="sticky top-0 z-20 flex justify-between items-center p-2  bg-white/30 backdrop-blur-md">
    <router-link to="/">
      <img
        src="../../assets/Logo.png"
        alt="logo"
        class="ml-20 transition-all duration-500 hover:scale-110"
        :class="logoSize"
      />

    </router-link>

    <div class="flex items-center gap-40 w-704 font-400 text-xl mr-20">
      <instagram/>
      <whatsapp/>

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

import Whatsapp from '@/components/Icons/whatsapp.vue';
import Instagram from '@/components/Icons/instagram.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const logoSize = computed(() => (isScrolled.value ? 'h-56' : 'h-100'));
</script>
<style lang="scss" scoped>

</style>