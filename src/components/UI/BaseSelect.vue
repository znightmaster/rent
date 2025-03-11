<template>
  <div class="flex flex-col gap-1">
    <label for="guests" class="text-gray-700 font-medium">{{ label }}</label>
    <select
      v-model="model"
      class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
      <option
        v-for="item in list"
        :key="item"
        :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup>

defineProps({
  label: {
    type: String,
    required: true,
  },
  list: {
    type: Array,
    required: true,
  },
});

const model = defineModel({ required: true });

</script>

<style lang="scss" scoped>

</style>