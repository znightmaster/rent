<script setup lang="ts">
// label — как показать тег (перевод); значение фильтра остаётся исходным
defineProps<{ tags: string[]; label?: (tag: string) => string }>()
const model = defineModel<string[]>({ required: true })

function toggle(tag: string) {
  model.value = model.value.includes(tag) ? model.value.filter((t) => t !== tag) : [...model.value, tag]
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="tag in tags"
      :key="tag"
      type="button"
      :aria-pressed="model.includes(tag)"
      class="rounded-full border px-4 py-1.5 text-sm transition"
      :class="
        model.includes(tag) ? 'border-rose bg-rose-soft text-rose-dark' : 'border-line bg-white hover:border-rose'
      "
      @click="toggle(tag)"
    >
      {{ label ? label(tag) : tag }}
    </button>
  </div>
</template>
