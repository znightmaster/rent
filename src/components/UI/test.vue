<template>
  <div class="grid gap-2 p-20">
    <h1>Задача: {{ task }}</h1>
    <p>Время на выполнение: {{ time }}</p>
    <p>Награда: {{ benefit }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  id: Number,
  task: String,
  time: Number,
  benefit: String,
});
</script>

<style lang="scss" scoped>

</style>