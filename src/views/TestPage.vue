<template>
  <div>
    <form class="flex flex-col w-max-[500px]" @submit.prevent="addTask">
      <input type="text" placeholder="Пишите тут"
             v-model="newTask"
             class="p-2 my-20 mx-20 focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2">
      <input type="text" placeholder="Пишите тут"
             v-model="newTime"
             class="p-2 my-20 mx-20 focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2">
      <input type="text" placeholder="Пишите тут"
             v-model="newBenefits"
             class="p-2 my-20 mx-20 focus:ring-teal-600 border rounded-4 focus:outline-none focus:ring-2">
      <button>Добавить задачу</button>
    </form>
    <test
      v-for="task in tasks"
      :key="task.id"
      :item="task"
    />
  </div>
</template>

<script setup>

import Test from '@/components/UI/test.vue';
import { ref } from 'vue';

let id = 0;

const newTask = ref('');
const newTime = ref(0);
const newBenefits = ref('');

function addTask() {
  tasks.value.push({ id: id++, task: newTask.value, time: newTime.value, benefit: newBenefits.value });
  newTask.value = '';
}

function removeTask(id) {
  tasks.value.splice(id, 1);
}

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