<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const menuOpen = ref(false)
const scrolled = ref(false)

const links = computed(() => [
  { to: '/apartments', label: t('nav.apartments') },
  { to: '/about', label: t('nav.about') },
  { to: '/contact', label: t('nav.contact') },
])

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
})

// Меню закрывается при переходе
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-paper/90 backdrop-blur transition-colors"
    :class="scrolled || menuOpen ? 'border-line' : 'border-transparent'"
  >
    <div class="container-page flex h-[4.5rem] items-center justify-between lg:h-24">
      <NuxtLinkLocale to="/" :aria-label="t('nav.home')" class="flex-none">
        <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-14 w-auto lg:h-[4.5rem]" />
      </NuxtLinkLocale>

      <!-- Всё, кроме логотипа, — одной компактной группой справа -->
      <div class="flex items-center gap-2 lg:gap-10">
        <nav class="hidden items-center gap-8 lg:flex" :aria-label="t('nav.main')">
          <NuxtLinkLocale
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="border-b border-transparent pb-0.5 transition hover:border-rose"
            active-class="!border-rose text-rose-dark"
          >
            {{ link.label }}
          </NuxtLinkLocale>
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <LangSwitcher />
          <a
            :href="site.phoneHref"
            :aria-label="t('common.call', { phone: site.phone })"
            :title="site.phone"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-brand transition duration-300 hover:scale-110 hover:border-rose hover:bg-rose-soft hover:text-rose-dark"
          >
            <SocialIcon name="phone" :size="20" />
          </a>
          <NuxtLinkLocale to="/apartments" class="btn-primary hidden lg:inline-flex">{{ t('header.choose') }}</NuxtLinkLocale>
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border bg-white transition duration-300 lg:hidden"
            :class="menuOpen ? 'border-rose bg-rose-soft' : 'border-line hover:border-rose'"
            :aria-label="menuOpen ? t('header.closeMenu') : t('header.openMenu')"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            @click="menuOpen = !menuOpen"
          >
            <span class="relative block h-2.5 w-[1.125rem]">
              <span
                class="absolute left-0 block h-px w-[1.125rem] bg-ink transition-all duration-300"
                :class="menuOpen ? 'top-1/2 rotate-45' : 'top-0'"
              />
              <span
                class="absolute left-0 block h-px w-[1.125rem] bg-ink transition-all duration-300"
                :class="menuOpen ? 'top-1/2 -rotate-45' : 'bottom-0'"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Мобильное меню: компактная панель под кнопкой; клик мимо неё закрывает меню -->
  <Transition name="fade">
    <div v-if="menuOpen" class="fixed inset-0 top-[4.5rem] z-[35] bg-ink/10 lg:hidden" aria-hidden="true" @click="menuOpen = false" />
  </Transition>
  <Transition name="sheet">
    <nav
      v-if="menuOpen"
      id="mobile-menu"
      class="fixed right-5 top-[4.75rem] z-[36] w-64 origin-top-right max-w-[calc(100vw-2.5rem)] rounded-3xl border border-line bg-white p-2 shadow-[0_24px_60px_-30px_rgba(36,52,59,0.5)] sm:right-8 lg:hidden"
      :aria-label="t('nav.mobile')"
    >
      <ul class="flex flex-col">
        <li v-for="link in links" :key="link.to">
          <NuxtLinkLocale
            :to="link.to"
            class="block rounded-2xl px-4 py-3 text-lg transition hover:bg-rose-soft/60"
            active-class="!bg-rose-soft text-rose-dark"
          >
            {{ link.label }}
          </NuxtLinkLocale>
        </li>
      </ul>
      <div class="mx-4 my-2 h-px bg-line" />
      <SocialLinks :size="24" class="justify-between px-4 py-3" />
    </nav>
  </Transition>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
.sheet-enter-active,
.sheet-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
</style>
