<template>
  <div>
    {{ route.params.id }}
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style lang="scss" scoped>

</style>