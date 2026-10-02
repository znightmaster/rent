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
  <!-- Линии подвала — в ширину контента, а не во весь экран -->
  <footer class="container-page mt-24">
    <!-- Телефон: мягкая карточка — логотип с соцсетями, разделы «таблетками», контакты -->
    <div class="flex flex-col gap-6 rounded-3xl bg-mist p-5 md:hidden">
      <div class="flex items-center justify-between gap-4">
        <NuxtLink to="/" aria-label="GoodHome — наверх" class="flex-none" @click="toTop">
          <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-14 w-auto" />
        </NuxtLink>
        <SocialLinks :size="18" round class="!gap-1.5" />
      </div>

      <nav class="flex flex-wrap gap-2" aria-label="Разделы сайта">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm transition hover:border-rose"
          active-class="!border-rose !bg-rose-soft text-rose-dark"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <address class="flex flex-col gap-1 not-italic">
        <a :href="site.phoneHref" class="w-fit text-lg transition hover:text-rose-dark">{{ site.phone }}</a>
        <a :href="`mailto:${site.email}`" class="w-fit break-all text-muted transition hover:text-rose-dark">{{ site.email }}</a>
      </address>
    </div>

    <!-- Планшет и компьютер: логотип слева, колонки «Разделы» и «Связаться» справа -->
    <div class="hidden items-start justify-between gap-10 border-t border-line py-12 md:flex">
      <NuxtLink to="/" aria-label="GoodHome — наверх" class="w-fit" @click="toTop">
        <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-20 w-auto transition duration-300 hover:opacity-80" />
      </NuxtLink>

      <div class="flex gap-14">
        <nav class="flex flex-col gap-3" aria-label="Разделы сайта">
          <p class="font-medium">Разделы</p>
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-muted transition hover:text-rose-dark">
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Разделитель: тонкая пудровая линия («GOOD»), растворяется к концам -->
        <span class="h-28 w-px flex-none self-center bg-gradient-to-b from-transparent via-rose to-transparent" aria-hidden="true" />

        <address class="flex min-w-0 flex-col gap-3 not-italic">
          <p class="font-medium">Связаться</p>
          <a :href="site.phoneHref" class="whitespace-nowrap text-muted transition hover:text-rose-dark">{{ site.phone }}</a>
          <a :href="`mailto:${site.email}`" class="break-all text-muted transition hover:text-rose-dark">{{ site.email }}</a>
          <SocialLinks :size="24" class="mt-1 !gap-4" />
        </address>
      </div>
    </div>

    <p class="py-5 text-sm text-muted md:border-t md:border-line">© {{ new Date().getFullYear() }} GoodHome</p>
  </footer>
</template>
