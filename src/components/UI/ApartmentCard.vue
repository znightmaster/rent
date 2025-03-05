<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl border">
    <!-- Основной блок -->
    <div class="flex flex-col md:flex-row">
      <!-- Фото апартаментов -->
      <div class="w-full md:w-1/3">
        <img :src="apartment.image" :alt="apartment.title" class="w-full h-48 object-cover">
      </div>

      <!-- Информация -->
      <div class="flex flex-col flex-grow p-4">
        <h3 class="text-xl font-semibold">{{ apartment.title }}</h3>
        <p class="text-gray-600">{{ apartment.location }}</p>
        <p class="text-gray-500">{{ apartment.shortDescription }}</p>
      </div>

      <!-- Цена -->
      <div class="flex items-center justify-center w-full md:w-1/4 p-4">
        <span class="text-lg font-bold text-blue-600">{{ apartment.price }} ₽/сутки</span>
      </div>
    </div>

    <!-- Кнопки -->
    <div class="flex justify-between p-4 border-t">
      <button class="text-blue-500 hover:underline" @click="toggleDetails">
        {{ showDetails ? "Скрыть" : "Подробнее" }}
      </button>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Забронировать
      </button>
    </div>

    <!-- Полное описание -->
    <div v-show="showDetails" class="p-4 border-t bg-gray-50 transition-opacity duration-300">
      <p>{{ apartment.fullDescription }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apartment: Object,
  },
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>

<style scoped>
/* Анимация раскрытия */
.v-enter-active, .v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
