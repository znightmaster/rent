<template>
  <div class="flex flex-col min-h-screen">
    <main-header/>
    <main class="flex flex-col flex-grow">
      <router-view/>
    </main>
    <main-footer/>
  </div>
</template>

<script setup>

import MainHeader from '@/components/layout/MainHeader.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
</script>

<style lang="scss" scoped>

</style>