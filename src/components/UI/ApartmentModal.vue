<template>
  <div
    v-if="isShow"
    class="fixed z-50 bg-black/60 w-full h-full left-0 top-0 flex items-center justify-center"
    @click="isShow = null">
    <div class="w-[600px] h-fit bg-white p-12 rounded-12 gap-20">
      <p class="font-500">Бронирование</p>
      <div class="flex gap-20">
        <img :src="`/src/assets/${isShow}`" class="aspect-square w-100 object-cover object-center"/>
        <div class="flex flex-col gap-4 justify-between min-h-full">
          <p>г. Павлодар, Ломова 177</p>
          <p>Комнат: 3</p>
          <p>Спальных мест: 4</p>
        </div>
      </div>
      <div></div>

    </div>
  </div>
</template>

<script setup>

const isShow = defineModel({ required: true, type: [String, null] });

</script>

<style lang="scss" scoped>

</style>