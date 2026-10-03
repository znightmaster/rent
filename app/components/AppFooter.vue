<script setup lang="ts">
const route = useRoute()

const links = [
  { to: '/apartments', label: 'Квартиры' },
  { to: '/about', label: 'О нас' },
  { to: '/contact', label: 'Контакты' },
]

// На главной логотип плавно поднимает к началу страницы; на других — ведёт на главную (она откроется сверху)
function toTop(e: MouseEvent) {
  if (route.path !== '/') return
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <!-- Телефон: мягкая карточка, всё по центру. Компьютер: одна строка над тонкой линией -->
  <footer class="container-page mt-24">
    <div
      class="flex flex-col items-center gap-6 rounded-3xl bg-mist px-4 py-8 md:flex-row md:justify-between md:gap-10 md:rounded-none md:border-t md:border-line md:bg-transparent md:px-0 md:py-10"
    >
      <NuxtLink to="/" aria-label="GoodHome — наверх" class="flex-none" @click="toTop">
        <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-16 w-auto transition duration-300 hover:opacity-80 md:h-14" />
      </NuxtLink>

      <nav class="flex items-center gap-3 md:gap-8" aria-label="Разделы сайта">
        <template v-for="(link, i) in links" :key="link.to">
          <span v-if="i" class="h-1 w-1 rounded-full bg-rose md:hidden" aria-hidden="true" />
          <NuxtLink :to="link.to" class="text-muted transition hover:text-rose-dark" active-class="!text-rose-dark">
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>

      <!-- Значки: связь | мессенджеры и соцсети, между ними — линия цвета «двери» -->
      <div class="flex items-center gap-2.5">
        <SocialLinks :items="['phone', 'mail']" :size="18" round class="!gap-1.5" />
        <span class="h-7 w-px bg-gradient-to-b from-transparent via-steel/60 to-transparent" aria-hidden="true" />
        <SocialLinks :size="18" round class="!gap-1.5" />
      </div>
    </div>

    <p class="py-5 text-center text-sm text-muted md:border-t md:border-line md:text-left">
      © {{ new Date().getFullYear() }} GoodHome
    </p>
  </footer>
</template>
