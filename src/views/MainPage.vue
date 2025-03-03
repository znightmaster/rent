<template>
  <div class="p-20 ">
    <div class="relative top-0 min-h-screen h-full w-full bg-cover bg-no-repeat rounded-16 bg-[url('@/assets/Banner6.jpeg')]">
      <div class="absolute min-w-[490] min-h-[250px] top-60 left-32">
        <div class="flex text-[4vw]">
          Уют, в который<br>
          хочется возвращаться
        </div>
        <div class="flex text-[2vw] mt-10">
          We provide a complete service for sale,<br>
          purchase or rental of real estate.
        </div>
      </div>
      <ReservationBar />
    </div>
    <div>
      <div class="relative top-10 min-h-screen h-full w-full bg-cover bg-no-repeat rounded-16 bg-[url('@/assets/Banner7.jpeg')]">
        <!-- Второй баннер (внизу справа, ближе к центру) -->
        <section class="absolute bottom-14 right-1/4 min-w-[400px] bg-white/30 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <div class="text-black space-y-4">
            <h2 class="text-3xl font-bold">О НАС</h2>
            <h3 class="text-2xl font-semibold">GoodHome<br>Гостиничная компания</h3>
            <p class="text-lg leading-relaxed">
              Каждая квартира по-своему уникальна<br>
              и не оставит вас равнодушными.<br>
              Идеальная чистота и современный<br>
              дизайн приятно удивляют.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>

import ReservationBar from '@/components/UI/ReservationBar.vue';
</script>

<style lang="scss" scoped>

</style>