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
          class="border-b border-transparent pb-0.5 transition hover:border-ink/30"
          active-class="!border-brand text-brand"
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

  <!-- Мобильное меню: во весь экран под шапкой, крупные ссылки -->
  <Transition name="sheet">
    <nav
      v-if="menuOpen"
      id="mobile-menu"
      class="fixed inset-x-0 bottom-0 top-[4.5rem] z-[35] flex flex-col justify-between overflow-y-auto bg-paper px-5 pb-8 pt-6 lg:hidden"
      aria-label="Мобильное меню"
    >
      <ul class="flex flex-col">
        <li v-for="link in links" :key="link.to" class="border-b border-line">
          <NuxtLink
            :to="link.to"
            class="block py-5 text-3xl font-light"
            active-class="text-brand"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <div class="mt-10 flex flex-col gap-4">
        <a :href="site.phoneHref" class="text-xl">{{ site.phone }}</a>
        <a :href="site.telegram" target="_blank" rel="noopener noreferrer" class="btn-primary">
          Написать в Telegram
        </a>
        <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="btn-secondary">
          Написать в WhatsApp
        </a>
        <SocialLinks :items="['instagram', 'booking']" class="pt-2" />
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.sheet-enter-active,
.sheet-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
</style>
