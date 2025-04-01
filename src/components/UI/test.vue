<template>
  <div class="grid gap-2 p-20">
    <h1>Задача: {{ item.task }}</h1>
    <p>Время на выполнение: {{ item.time }}</p>
    <p>Награда: {{ item.benefit }}</p>
    <button
      class="relative m-2 p-2 w-fit bg-teal-600 text-white rounded-lg hover:bg-teal-700"
      @click="$emit('removeTask', item)"
    >
      Удалить задачу
    </button>
  </div>
</template>

<script setup>

const props = defineProps({
  item: { type: Object },
});
</script>

<style lang="scss" scoped>

</style>

<!--<template>-->
<!--  <div class="flex flex-col items-center justify-center h-screen gap-5">-->
<!--    <h1 v-if="!winner" class="text-2xl font-bold">Следующий ход: {{ currentPlayer }}</h1>-->
<!--    <h1 v-else class="text-2xl font-bold text-teal-700">Победил: {{ winner }} 🎉</h1>-->

<!--    <div-->
<!--      class="w-[600px] h-[600px] bg-teal-600 rounded-lg grid grid-cols-3 grid-rows-3 gap-5 p-5">-->
<!--      <div-->
<!--        v-for="(cell, index) in board"-->
<!--        :key="index"-->
<!--        class="w-full h-full bg-gray-300 rounded-md flex justify-center items-center text-6xl font-bold cursor-pointer select-none"-->
<!--        @click="makeMove(index)"-->
<!--      >-->
<!--        <span :class="{'text-teal-600 cross': cell === 'X', 'text-teal-400 circle': cell === 'O'}">-->
<!--          {{ cell }}-->
<!--        </span>-->
<!--      </div>-->
<!--    </div>-->

<!--    <button-->
<!--      class="mt-4 px-6 py-3 bg-teal-600 text-white h-fit rounded-md hover:bg-teal-700 transition"-->
<!--      @click="resetGame"-->
<!--    >-->
<!--      Сбросить игру-->
<!--    </button>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from 'vue';-->

<!--const board = ref(Array(9).fill(null));-->
<!--const currentPlayer = ref('X');-->
<!--const winner = ref(null);-->

<!--const winningCombinations = [-->
<!--  [0, 1, 2], [3, 4, 5], [6, 7, 8],-->
<!--  [0, 3, 6], [1, 4, 7], [2, 5, 8],-->
<!--  [0, 4, 8], [2, 4, 6],-->
<!--];-->

<!--const makeMove = (index) => {-->
<!--  if (!board.value[index] && !winner.value) {-->
<!--    board.value[index] = currentPlayer.value;-->
<!--    checkWinner();-->
<!--    if (!winner.value) {-->
<!--      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';-->
<!--    }-->
<!--  }-->
<!--};-->

<!--const checkWinner = () => {-->
<!--  for (let combo of winningCombinations) {-->
<!--    const [a, b, c] = combo;-->
<!--    if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) {-->
<!--      winner.value = board.value[a];-->
<!--      return;-->
<!--    }-->
<!--  }-->
<!--};-->

<!--const resetGame = () => {-->
<!--  board.value = Array(9).fill(null);-->
<!--  currentPlayer.value = 'X';-->
<!--  winner.value = null;-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.cross {-->
<!--  animation: fadeIn 0.3s ease-in-out;-->
<!--}-->

<!--.circle {-->
<!--  animation: fadeIn 0.3s ease-in-out;-->
<!--}-->

<!--@keyframes fadeIn {-->
<!--  from {-->
<!--    opacity: 0;-->
<!--    transform: scale(0.8);-->
<!--  }-->
<!--  to {-->
<!--    opacity: 1;-->
<!--    transform: scale(1);-->
<!--  }-->
<!--}-->
<!--</style>-->