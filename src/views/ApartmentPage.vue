<template>
  <div class="grid grid-cols-2 sm:grid-cols-1 p-20 gap-20">
    <image-preview-picker :list="imageList"/>
    <div class="flex flex-col w-full gap-20">
      <div class="flex flex-col gap-20 py-40 px-80 bg-gray-300 rounded-8">
        <apartment-button @click="openModal">Забронировать номер</apartment-button>
        <apartment-button>Смотреть видео</apartment-button>
      </div>
      <div class="flex flex-col gap-20 py-40 px-80 ">
        <p><strong>Площадь номера:</strong> от 50 до 71 кв.м.</p>
        <div class="flex flex-col gap-4">
          <transition-group appear name="show-x">
            <p
              v-for="(text, index) in textList"
              :key="index"
              :style="`transition-delay: ${150 * index}ms`">
              {{ text }}
            </p>
          </transition-group>
        </div>
      </div>
    </div>
  </div>

  <apartment-modal v-model="modal"/>
</template>

<script setup>
import { ref } from 'vue';
import ImagePreviewPicker from '@/components/UI/ImagePreviewPicker.vue';
import ApartmentButton from '@/components/UI/ApartmentButton.vue';
import ApartmentModal from '@/components/UI/ApartmentModal.vue';

const imageList = [
  'src/assets/Banner8.png',
  'src/assets/Banner10.png',
  'src/assets/Banner9.png',
];

const textList = [
  'Оцените все преимущества просторной гостиной, откуда открываются великолепный вид на центр города, и насладитесь каждым мгновением в атмосфере комфорта.',
  'Площадь номера составляет от 50 до 71 кв.м. Просторный и комфортабельный номер подходит как для деловых встреч, так и для отдыха. Из номера открывается вид на городской пейзаж.',
  'Светлые и просторные номера выполнены в двух разных цветовых гаммах — бордовой и синей — с элементами декора из темного дерева.',
  'Размеры и дизайн номеров могут варьироваться. Изображение не соответствует каждому номеру данной категории.',
];

const modal = ref(false);

const openModal = () => {
  modal.value = true;
};
</script>

<style lang="scss" scoped>
.show-x-enter-from, .show-x-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.show-x-enter-active, .show-x-leave-active {
  transition: all 0.5s ease;
}
</style>
