<template>
  <div class="flex gap-4 my-20 px-20 flex-wrap">
    <div
      v-for="item in data"
      :key="item"
      @click="handleModelChange(item)"
      :class="model.includes(item) ? 'bg-teal-600 text-white' : 'hover:bg-gray-200'"
      class="cursor-pointer px-3 py-1 border rounded-lg transition">
      {{ item }}
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const model = defineModel({
  type: Array,
  required: true,
});

const handleModelChange = (item) => {
  model.value = model.value.includes(item) ? model.value.filter(x => x !== item) : [...model.value, item];
};

</script>

<style lang="scss" scoped>

</style>