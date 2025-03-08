<template>
  <div class="relative flex justify-center w-full">
    <transition name="show" mode="out-in">
      <img
        :key="current"
        :src="current"
        class="aspect-square w-full object-cover object-center"/>
    </transition>

    <div class="flex gap-20 h-100 w-fit absolute -bottom-48">
      <img
        v-for="img in list"
        class="aspect-square h-full object-cover object-center cursor-pointer"
        :key="img"
        :src="img"
        @click="current = img">

    </div>
  </div>

</template>

<script setup>

import { ref } from 'vue';

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});

const current = ref(props.list[0]);

</script>

<style lang="scss" scoped>

.show-enter-from, .show-leave-to {
  opacity: 0;
  filter: blur(20px);
}

.show-enter-active, .show-leave-active {
  transition: opacity 0.3s ease;
}

</style>