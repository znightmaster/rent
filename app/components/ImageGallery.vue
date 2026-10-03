<script setup lang="ts">
const props = defineProps<{ images: string[]; alt: string }>()
const current = ref(0)

// Если список фото сменился (другая квартира) — возвращаемся к первому
watch(
  () => props.images,
  () => {
    current.value = 0
  },
)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="aspect-[4/3] overflow-hidden rounded-3xl bg-mist lg:aspect-[5/4]">
      <Transition name="fade" mode="out-in">
        <NuxtImg
          :key="images[current]"
          :src="images[current]"
          :alt="alt"
          width="1000"
          height="800"
          sizes="100vw lg:700px"
          :preload="current === 0"
          class="h-full w-full object-cover"
        />
      </Transition>
    </div>

    <div v-if="images.length > 1" class="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        class="h-16 w-16 flex-none overflow-hidden rounded-xl transition sm:h-20 sm:w-20"
        :class="index === current ? 'ring-2 ring-brand ring-offset-2 ring-offset-paper' : 'opacity-70 hover:opacity-100'"
        :aria-label="$t('apartments.photoOf', { i: index + 1, n: images.length })"
        :aria-current="index === current"
        @click="current = index"
      >
        <NuxtImg :src="image" alt="" width="160" height="160" loading="lazy" class="h-full w-full object-cover" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
</style>
