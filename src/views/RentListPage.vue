<template>
  <div class="p-6 flex justify-center">
    <ApartmentCard :apartment="{
  image: '/assets/rentObject101.PNG',
  title: 'Просторная квартира у моря',
  location: 'Сочи, Россия',
  shortDescription: 'Уютная квартира с видом на море.',
  fullDescription: 'Полное описание: 2 спальни, кухня, балкон с видом на море, Wi-Fi, кондиционер, парковка.',
  price: '5000'
}" />
  </div>
</template>

<script setup>
import ApartmentCard from "@/components/UI/ApartmentCard.vue";


</script>

<style lang="scss" scoped></style>
