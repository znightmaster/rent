<template>
  <div>
    <a
      href="https://wa.me/77059870117"
      target="_blank"
      class="fixed z-100000 bottom-6 right-6 transition duration-300"
    >
      <img src="/whatsapp.png" alt=""/>
    </a>
  </div>
</template>

<script setup>

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
