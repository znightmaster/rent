<template>
  <div
    class="fixed z-50 bg-black/60 w-full h-full left-0 top-0 flex items-center justify-center"
    @click="store.modal = null">
    <div class="flex flex-col w-[600px] h-fit bg-white p-12 rounded-12 gap-3" @click.stop>
      <p class="font-500">Бронирование</p>
      <div class="flex gap-20">
        <img src="/img/Banner8.png" class="aspect-square w-100 object-cover object-center" alt=""/>
        <div class="flex flex-col gap-8  min-h-full">
          <h2 class="text-18 font-bold text-teal-600">{{store.modal.title}}</h2>
          <p>{{ store.modal.address }}</p>
          <p>Спальных мест: {{store.modal.tenant_limit}}</p>
        </div>
      </div>
      <div class="flex gap-20 justify-between top-10">
        <div class="flex w-1/2 gap-[5px]">
          <date-picker v-model="date.start" label="Заезд"/>
          <time-select class="row-span-2 self-end"/>
        </div>
        <div class="flex w-1/2 gap-[5px]">
          <date-picker v-model="date.end" label="Выезд"/>
          <time-select class="row-span-2 self-end"/>
        </div>
      </div>
      <div>
        <p>Сумма за 1 ночь</p>
        <p>{{store.modal.price}} KZt</p>
      </div>
      <div class="flex justify-between gap-4">
        <label class="w-1/2 flex flex-col gap-1">
          Имя
          <input
            placeholder="Name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"/>
        </label>
        <base-select v-model="guest" label="Гости" :list="guestList" class="w-1/2"/>
      </div>
      <div class="flex justify-between gap-4">
        <label class="w-1/2 flex flex-col gap-1">
          Телефон
          <input
            placeholder="+7"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"/>
        </label>
        <label class="w-1/2 flex flex-col gap-1">
          E-mail
          <input
            placeholder="E-mail"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"/>
        </label>
      </div>
      <label class="flex flex-col gap-1">
        Ваши пожелания
        <textarea cols="30" rows="4"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"></textarea>
      </label>
      <p>Сумма бронирования {{store.modal.price}} KZT Эту сумму вам нужно будет оплатить при заселении.</p>
      <label class="flex ">
        <input type="checkbox" class="mr-1">
        я согласен с условиями&nbsp;<a href="">пользовательского соглашения</a>
      </label>
      <div class="flex gap-2 justify-end">
        <button @click="store.modal = null" class="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg">Отмена
        </button>
        <button class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg">Забронировать</button>
      </div>

    </div>
  </div>
</template>

<script setup>

import DatePicker from '@/components/UI/DatePicker.vue';
import BaseSelect from '@/components/UI/BaseSelect.vue';
import { reactive, ref } from 'vue';
import { useMainStore } from '@/stores/counter.js';
import TimeSelect from '@/components/UI/TimeSelect.vue';

const date = reactive({
  start: null,
  end: null,
});

const store = useMainStore();
console.log(store.modal);
const guest = ref('1');
const guestList = ['1', '2', '3', '4+'];
const hoursList = ['1','2']

</script>

<style lang="scss" scoped>

</style>