<template>
  <div>
    <Whatsapp class="fixed bottom-6 right-6"/>
  </div>

</template>

<script setup>
import Whatsapp from '@/components/Icons/whatsapp.vue';

</script>

<style scoped>

a {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
