<template>
  <div class="flex flex-col gap-32">
    <!--    <button @click="callback">УБИРАЙ падла</button>-->
    <!--    <button @click="testing.push(1)">Наживай падла</button>-->
    <button @click="sorting">Наживай падла</button>

    <!--    <div class="mx-auto flex flex-col  gap-12">-->
    <!--      <transition-group name="show-y">-->
    <!--        <div-->
    <!--          v-for="item in testing"-->
    <!--          :key="item"-->
    <!--          class="h-200 w-200 bg-blue-900">-->
    <!--        </div>-->
    <!--      </transition-group>-->
    <!--    </div>-->

    <input class="bg-red-400" v-model="test">

    <transition name="show-y" mode="out-in">
      <p :key="test">{{ test }}</p>
    </transition>
  </div>
</template>

<script setup>

import { ref } from 'vue';

const test = ref('');

const testing = ref([2, 3, 5, 1, 7]);

const callback = () => {
  testing.value = testing.value.filter((item, index, arr) => index !== arr.length - 1);
};

const sorting = () => {
  testing.value = testing.value.toSorted((a, b) => a - b);
};

</script>

<style lang="scss" scoped>

.show-y-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.show-y-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.show-y-enter-active,
.show-y-leave-active {
  transition: all 0.3s ease;
}

.show-y-move {
  transition: all 0.3s ease;
}

</style>