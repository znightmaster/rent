<template>
  <div class="grid grid-cols-2 sm:grid-cols-1 p-20 gap-20">
    <image-preview-picker :list="imageList"/>
    <div class="flex flex-col w-full gap-20">
      <div class="flex flex-col gap-20 py-40 px-80 bg-black">
        <apartment-button>Забронировать номер</apartment-button>
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
</template>

<script setup>
import ImagePreviewPicker from '@/components/UI/ImagePreviewPicker.vue';
import ApartmentButton from '@/components/UI/ApartmentButton.vue';

const imageList = [
  'https://thelegendofmoscow.com/upload/resize_cache/iblock/f1a/700_525_2/lvsjubjb34ijtm5ba01geqn7get3216u.jpeg',
  'https://thelegendofmoscow.com/upload/resize_cache/iblock/c0c/700_525_2/liod3nakfk401xj1ca9k0k20up6z4q8f.jpeg',
  'https://thelegendofmoscow.com/upload/resize_cache/iblock/4f5/700_525_2/7c5g5p5a9vzaztdyun30scfbfed98sse.jpg',
];
const textList = [
  'Оцените все преимущества просторной гостиной, откуда открываются великолепный вид на центр города, и насладитесь каждым мгновением в атмосфере комфорта.',
  'Площадь номера составляет от 50 до 71 кв.м. Просторный и комфортабельный номер подходит как для деловых встреч, так и для отдыха. Из номера открывается вид на городской пейзаж.',
  'Светлые и просторные номера выполнены в двух разных цветовых гаммах — бордовой и синей — с элементами декора из темного дерева.',
  'Размеры и дизайн номеров могут варьироваться. Изображение не соответствует каждому номеру данной категории.',
];

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