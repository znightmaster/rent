<template>
  <div class="flex flex-col h-screen items-center justify-center gap-10">
    <h1 v-if="!end" class="text-2xl">Следующий ходит: {{ currentPlayer }}</h1>
    <h1 v-else class="text-2xl"> {{ winner ? `Победил: ${winner}` : 'Ничья' }} </h1>

    <div class="grid grid-cols-3 grid-rows-3 w-[600px] h-[600px] bg-teal-700 rounded-8 gap-5 p-5">
      <div
        v-for="(item, index) in board"
        :key="index"
        class="w-full h-full bg-gray-300 rounded-md flex justify-center items-center text-6xl font-bold cursor-pointer select-none"
        @click="queuePlayer(index)"
      >
        <span
          :class="{'text-teal-600': item === 'O', 'text-gray-600': item === 'X'}"
        >
          {{ item }}

        </span>

      </div>
    </div>
    <button
      class="bg-teal-600 text-white px-6 py-2 h-fit rounded-md hover:bg-teal-700 transition"
      @click="resetGame"
    >Сбросить игру
    </button>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const board = ref(Array(9).fill(null));
const currentPlayer = ref('X');
const winner = ref('');
const end = ref(false);

const winningCombo = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // по-горизонтали
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // по-вертикали
  [0, 4, 8], [2, 4, 6],  // на искосок
];

const queuePlayer = (index) => {
  if (!board.value[index] && !end.value && !isDraw.value) {
    board.value[index] = currentPlayer.value;
    checkWinner();

    if (!winner.value) {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
    }
  }
  else if (isDraw.value) end.value = true;
};

const isDraw = computed(() => board.value.every(cell => cell) && !winner.value);

const checkWinner = () => {
  const isWining = winningCombo.some(combo => combo.every(index => board.value[index] === currentPlayer.value));

  winner.value = isWining ? currentPlayer.value : null;
  end.value = isWining;
};

const resetGame = () => {
  board.value = Array(9).fill(null);
  currentPlayer.value = 'X';
  winner.value = null;
  end.value = false;
};

</script>

<style lang="scss" scoped>

</style>