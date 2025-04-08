<template>
  <div class="flex flex-col flex-grow px-60 pt-60">
    <form
      @submit.prevent.stop="submit"
      class="flex flex-col"
    >
      <input
        type="text"
        v-model="review.author"
        placeholder="Как вас зовут?"
        class="p-2 my-20 mx-20 focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2"
      >

      <textarea
      v-model="review.text"
      rows="3"
      placeholder="Что понравилось? что нет?"
      class="p-2 my-20 mx-20 focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2"
      >
      </textarea>

      <div class="grid gap-20 p-2 my-20 mx-20">
        <label for=""
        class=""
        >Фото</label>
        <input
          type="file"
          class="bg-teal-600 text-white px-6 py-2 h-fit rounded-md hover:bg-teal-700 transition"
        >
      </div>

      <div
        class="flex  gap-2 p-2  mx-20"
        v-for="star in stars"
        :key="star"
      >
        <input
          type="checkbox"
          v-model="review.stars"
          :value="star"
          class=""
          :id="`star${star}`"
        >
        <label
          :for="`star${star}`"
        >
          {{star}}
        </label>
      </div>

      <div class="flex gap-2 p-2 mx-20 mt-3">
        <div>
          <input
            type="radio"
            id="adv1"
            class="mr-2"
          >
          <label for="adv1">Не советую</label>
        </div>
        <div>
          <input
            type="radio"
            id="adv1"
            class="mr-2"
          >
          <label for="adv2">Советую</label>
        </div>

      </div>
      <button
        class="w-fit mx-20 mt-20 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
      >
        Отправить
      </button>



    </form>


  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const review = reactive({
  author: '',
  starts: null,
  text: '',
  photos: [],
  isRecommended: true,
})

const stars = [1, 2, 3, 4, 5]

const submit = () => {
  console.log('submit!')
}


</script>

<style lang="scss" scoped>

</style>