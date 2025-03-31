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