<template>
  <div class="w-ful max-w-[1400px] h-[400px] flex border rounded-2xl shadow-lg overflow-hidden">

    <div class="w-1/3 h-full">
      <img
        :src="`/src/assets/${img}`"
        alt="photo"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="w-2/3 p-6 flex flex-col justify-between">
      <div>
        <h2 class="text-2xl font-bold">Квартира</h2>
        <p class="text-gray-600 mt-2">
          Квартира оснащена абсолютно всем необходимым для комфортного проживания вдали от дома: → Свежее,
          качественное, выглаженное постельное белье и полотенца; → Одноразовые тапочки и зубные наборы; → Большой
          SMART-TV с выходом в интернет; → Новый дизайнерский ремонт в современном стиле; → Большая, удобная кровать
        </p>
        <p class="text-xl font-semibold text-teal-600 mt-4">20 000 KZt</p>
      </div>

      <div class="flex gap-4">
        <router-link to="/apartment">
          <button  class="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg">
            Подробнее
          </button>
        </router-link>
        <button
          @click="emit('chlen', img)"
          class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg">
          Забронировать
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['chlen']);

defineProps({
  img: {
    type: String,
    required: true,
  },
});

</script>

<style lang="scss" scoped>

</style>