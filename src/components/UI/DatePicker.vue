<template>
  <div class="flex flex-col gap-4 w-full max-w-160">
    <p v-if="label">{{ label }}</p>

    <vue-date-picker
      ref="datePicker"
      hide-offset-dates
      :model-type="'format'"
      placeholder="дд.мм.гггг"
      locale="ru-RU"
      v-model="model"
      format="dd.MM.yyyy"/>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
});

const datePicker = ref(null);

const model = defineModel({ required: true });

</script>

<style lang="scss" scoped>

</style>