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
  <footer class="container-page mt-24">
    <!-- Телефон: мягкая карточка, всё по центру -->
    <div class="flex flex-col items-center gap-6 rounded-3xl bg-mist px-4 py-8 md:hidden">
      <NuxtLink to="/" aria-label="GoodHome — наверх" class="flex-none" @click="toTop">
        <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-16 w-auto" />
      </NuxtLink>

      <nav class="flex items-center gap-3" aria-label="Разделы сайта">
        <template v-for="(link, i) in links" :key="link.to">
          <span v-if="i" class="h-1 w-1 rounded-full bg-rose" aria-hidden="true" />
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

    <!-- Планшет и компьютер: логотип слева, колонки «Разделы» и «Связаться» справа -->
    <div class="hidden items-start justify-between gap-10 border-t border-line py-12 md:flex">
      <NuxtLink to="/" aria-label="GoodHome — наверх" class="w-fit" @click="toTop">
        <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-20 w-auto transition duration-300 hover:opacity-80" />
      </NuxtLink>

      <div class="flex gap-14">
        <nav class="flex flex-col gap-3" aria-label="Разделы сайта">
          <p class="font-medium">Разделы</p>
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-muted transition hover:text-rose-dark"
            active-class="!text-rose-dark"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Разделитель: тонкая линия цвета «двери», растворяется к концам -->
        <span class="h-28 w-px flex-none self-center bg-gradient-to-b from-transparent via-steel/60 to-transparent" aria-hidden="true" />

        <address class="flex min-w-0 flex-col gap-3 not-italic">
          <p class="font-medium">Связаться</p>
          <a :href="site.phoneHref" class="whitespace-nowrap text-muted transition hover:text-rose-dark">{{ site.phone }}</a>
          <a :href="`mailto:${site.email}`" class="break-all text-muted transition hover:text-rose-dark">{{ site.email }}</a>
          <SocialLinks :size="24" class="mt-1 !gap-4" />
        </address>
      </div>
    </div>

    <p class="py-5 text-center text-sm text-muted md:border-t md:border-line md:text-left">
      © {{ new Date().getFullYear() }} GoodHome
    </p>
  </footer>
</template>
