<template>
  <footer class="mt-24 border-t border-line">
    <div class="container-page grid gap-12 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
      <div class="flex flex-col gap-4">
        <NuxtLink to="/" aria-label="GoodHome — на главную" class="w-fit">
          <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-20 w-auto" />
        </NuxtLink>
        <p class="max-w-xs text-muted">Дизайнерские гостевые квартиры в Павлодаре.</p>
      </div>

      <nav class="flex flex-col gap-3" aria-label="Разделы сайта">
        <p class="font-medium">Разделы</p>
        <NuxtLink to="/apartments" class="text-muted transition hover:text-brand">Квартиры</NuxtLink>
        <NuxtLink to="/about" class="text-muted transition hover:text-brand">О нас</NuxtLink>
        <NuxtLink to="/contact" class="text-muted transition hover:text-brand">Контакты</NuxtLink>
      </nav>

      <address class="flex flex-col gap-3 not-italic">
        <p class="font-medium">Связаться</p>
        <a :href="site.phoneHref" class="text-muted transition hover:text-brand">{{ site.phone }}</a>
        <a :href="`mailto:${site.email}`" class="text-muted transition hover:text-brand">{{ site.email }}</a>
        <SocialLinks class="mt-2" />
      </address>
    </div>

    <div class="border-t border-line">
      <p class="container-page py-5 text-sm text-muted">© {{ new Date().getFullYear() }} GoodHome</p>
    </div>
  </footer>
</template>
