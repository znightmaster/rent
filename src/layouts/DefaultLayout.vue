
<template>
  <div class="flex flex-col">
    <main-header />
    <router-view/>
    <main-footer/>
  </div>
</template>

<script setup>

import MainHeader from '@/components/layout/MainHeader.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
</script>

<style lang="scss" scoped>

</style>