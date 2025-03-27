<template>
  <div class="grid gap-2 p-20">
    <h1>Задача: {{ item.task }}</h1>
    <p>Время на выполнение: {{ item.time }}</p>
    <p>Награда: {{ item.benefit }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  item: { type: Object },
});
</script>

<style lang="scss" scoped>

</style>