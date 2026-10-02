<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)

const links = [
  { to: '/apartments', label: 'Квартиры' },
  { to: '/about', label: 'О нас' },
  { to: '/contact', label: 'Контакты' },
]

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// Меню закрывается при переходе; пока оно открыто, страница под ним не прокручивается
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-paper/90 backdrop-blur transition-colors"
    :class="scrolled || menuOpen ? 'border-line' : 'border-transparent'"
  >
    <div class="container-page flex h-[4.5rem] items-center justify-between lg:h-24">
      <NuxtLink to="/" aria-label="GoodHome — на главную" class="flex-none">
        <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-14 w-auto lg:h-[4.5rem]" />
      </NuxtLink>

      <nav class="hidden items-center gap-10 lg:flex" aria-label="Основное меню">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative pb-1 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-brand hover:after:scale-x-100"
          active-class="text-brand after:scale-x-100"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-6 lg:flex">
        <a :href="site.phoneHref" class="transition hover:text-brand">{{ site.phone }}</a>
        <NuxtLink to="/apartments" class="btn-primary">Выбрать квартиру</NuxtLink>
      </div>

      <button
        type="button"
        class="-mr-2 flex h-12 w-12 items-center justify-center rounded-full lg:hidden"
        :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="relative block h-3.5 w-6">
          <span
            class="absolute left-0 block h-px w-6 bg-ink transition-all duration-300"
            :class="menuOpen ? 'top-1/2 rotate-45' : 'top-0'"
          />
          <span
            class="absolute left-0 block h-px w-6 bg-ink transition-all duration-300"
            :class="menuOpen ? 'top-1/2 -rotate-45' : 'bottom-0'"
          />
        </span>
      </button>
    </div>
  </header>

  <!-- Мобильное меню: компактная панель под шапкой (по высоте контента), страница затемняется -->
  <Transition name="scrim">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-[34] bg-ink/30 backdrop-blur-[2px] lg:hidden"
      aria-hidden="true"
      @click="menuOpen = false"
    />
  </Transition>

  <Transition name="menu">
    <nav
      v-if="menuOpen"
      id="mobile-menu"
      class="fixed inset-x-0 top-[4.5rem] z-[35] rounded-b-[1.75rem] bg-paper px-5 pb-6 pt-1 lg:hidden"
      aria-label="Мобильное меню"
    >
      <ul>
        <li v-for="(link, i) in links" :key="link.to" class="menu-item border-b border-line" :style="{ '--i': i }">
          <NuxtLink :to="link.to" class="block py-4 text-2xl font-light" active-class="text-brand">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <div class="menu-item mt-5 flex items-center justify-between gap-4" :style="{ '--i': links.length }">
        <a :href="site.phoneHref" class="text-lg">{{ site.phone }}</a>
        <SocialLinks :size="24" />
      </div>

      <div class="menu-item mt-4" :style="{ '--i': links.length + 1 }">
        <a :href="site.telegram" target="_blank" rel="noopener noreferrer" class="btn-primary w-full">
          Написать в Telegram
        </a>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
/* Панель «раскрывается» сверху вниз — то же движение, что у двери на главной */
.menu-enter-active {
  transition: clip-path 0.5s cubic-bezier(0.22, 0.8, 0.24, 1);
}
.menu-leave-active {
  transition: clip-path 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0 round 0 0 1.75rem 1.75rem);
}
.menu-enter-to,
.menu-leave-from {
  clip-path: inset(0 0 0 0 round 0 0 1.75rem 1.75rem);
}

/* Пункты появляются по очереди */
.menu-item {
  animation: menu-rise 0.55s cubic-bezier(0.22, 0.8, 0.24, 1) both;
  animation-delay: calc(120ms + var(--i, 0) * 70ms);
}
@keyframes menu-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.scrim-enter-active,
.scrim-leave-active {
  transition: opacity 0.3s ease;
}
.scrim-enter-from,
.scrim-leave-to {
  opacity: 0;
}
</style>
