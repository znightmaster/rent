<script setup lang="ts">
// Фото в «дверной» рамке: арочный верх и тонкая внешняя линия — отсылка к двери и косяку из логотипа.
defineProps<{ src: string; alt?: string; reveal?: boolean; position?: string }>()
</script>

<template>
  <div class="door" :class="{ 'door--reveal': reveal }">
    <NuxtImg
      :src="src"
      :alt="alt ?? ''"
      width="1000"
      height="1250"
      sizes="100vw lg:560px"
      :preload="reveal"
      :fetchpriority="reveal ? 'high' : 'auto'"
      class="door__img"
      :style="{ objectPosition: position ?? 'center' }"
    />
  </div>
</template>

<style scoped>
.door {
  --r-top: 7rem;
  --r-bottom: 1.5rem;
  position: relative;
  margin: 14px;
  aspect-ratio: 4 / 5;
}
@media (min-width: 1024px) {
  .door {
    --r-top: 10rem;
  }
}
.door::before {
  content: '';
  position: absolute;
  inset: -14px;
  border: 1px solid #7898b0;
  border-radius: calc(var(--r-top) + 14px) calc(var(--r-top) + 14px) calc(var(--r-bottom) + 14px)
    calc(var(--r-bottom) + 14px);
  opacity: 0.55;
  pointer-events: none;
}
.door__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--r-top) var(--r-top) var(--r-bottom) var(--r-bottom);
}

/* Единственная анимация на сайте: фото «открывается» как дверь при загрузке главной */
.door--reveal .door__img {
  animation: door-open 1.1s cubic-bezier(0.22, 0.8, 0.24, 1) both;
}
@keyframes door-open {
  from {
    clip-path: inset(0 100% 0 0 round var(--r-top) var(--r-top) var(--r-bottom) var(--r-bottom));
  }
  to {
    clip-path: inset(0 0 0 0 round var(--r-top) var(--r-top) var(--r-bottom) var(--r-bottom));
  }
}
</style>
