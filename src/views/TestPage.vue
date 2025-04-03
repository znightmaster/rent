<template>
  <div class="flex flex-col p-20">
    <form class="flex flex-col bg-gray-200 m-20 rounded-8">
      <input type="text" placeholder="Задача"
             v-model="newTask"
             class="p-2 my-20 mx-20 focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2">
      <base-select :list="timeList" label="" v-model="newTime"
                   class=" my-20 mx-20 focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2"/>
      <input type="text" placeholder="Награда"
             v-model="newBenefits"
             class="p-2 my-20 mx-20 focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2">
      <div class="flex items-center justify-between mx-20 mb-20">
        <burger-menu @click="sortTime"/>
        <div class="flex items-center gap-2">
          <input
            v-model="searchItems"
            placeholder="Поиск"
            class="flex p-2 self-center focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2"
          >
          <button
            class="flex self-center p-2 w-fit bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            @click="search"
          >Поиск</button>
        </div>
        <button
          @click="addTask"
          :disabled="!isValid"
          class="relative p-2 w-fit bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          :class="{ 'opacity-50 cursor-not-allowed': !isValid }"
        >
          Добавить задачу
        </button>
      </div>
    </form>

    <test
      v-for="task in tasks"
      :key="task.id"
      :item="task"
      @remove-task="removeTask"
    />
  </div>
</template>

<script setup>
import Test from '@/components/UI/test.vue';
import { computed, ref } from 'vue';
import BaseSelect from '@/components/UI/BaseSelect.vue';
import BurgerMenu from '@/components/UI/BurgerMenu.vue';

let id = 0;

const newTask = ref('');
const newTime = ref('');
const newBenefits = ref('');
const isSorted = ref(true);
const searchItems = ref('');

function sortTime() {
  tasks.value.sort((a, b) => isSorted.value ? a.time - b.time : b.time - a.time);
  isSorted.value = !isSorted.value;
}

const isValid = computed(() => {
  return newTask.value && newTime.value && newBenefits.value;
});

function addTask() {

  tasks.value.push({
    id: id++,
    task: newTask.value,
    time: Number(newTime.value),
    benefit: newBenefits.value,
  });

  newTask.value = '';
  newTime.value = '';
  newBenefits.value = '';
}

function removeTask(item) {
  tasks.value = tasks.value.filter((t) => t !== item);
}

function search(item) {
  searchItems.value = tasks.value.find((t) => t.id === item.id && t.time === item.time && t.task === item.task && t.benefit === item.benefit);
}
console.log(search);


const timeList = ref([5, 10, 15, 20, 25, 30, 40]);

const tasks = ref([
  {
    id: 1,
    task: 'Прочитать 10 страниц книги',
    time: 30,
    benefit: 'Развитие мышления, улучшение концентрации и пополнение словарного запаса.',
  },
  {
    id: 2,
    task: 'Сделать 15-минутную зарядку',
    time: 15,
    benefit: 'Повышение энергии, улучшение самочувствия и укрепление здоровья.',
  },
  {
    id: 3,
    task: 'Выучить 5 новых слов на английском',
    time: 20,
    benefit: 'Расширение словарного запаса и улучшение языковых навыков.',
  },
  {
    id: 4,
    task: 'Написать 500 слов в дневник',
    time: 25,
    benefit: 'Развитие навыка саморефлексии и улучшение письменной речи.',
  },
  {
    id: 5,
    task: 'Помедитировать 10 минут',
    time: 10,
    benefit: 'Снижение стресса, улучшение концентрации и эмоционального состояния.',
  },
  {
    id: 6,
    task: 'Разобрать 10 писем в почте',
    time: 20,
    benefit: 'Поддержание порядка в работе и избавление от информационного шума.',
  },
  {
    id: 7,
    task: 'Убраться в комнате',
    time: 40,
    benefit: 'Чистое пространство помогает улучшить концентрацию и уменьшить стресс.',
  },
  {
    id: 8,
    task: 'Позвонить родителям',
    time: 15,
    benefit: 'Укрепление семейных связей и эмоциональная поддержка.',
  },
  {
    id: 9,
    task: 'Запланировать день на завтра',
    time: 10,
    benefit: 'Увеличение продуктивности и снижение тревожности.',
  },
  {
    id: 10,
    task: 'Сделать 5-минутную растяжку',
    time: 5,
    benefit: 'Улучшение гибкости и профилактика болей в спине.',
  },
]);

</script>

<style lang="scss" scoped>

</style>