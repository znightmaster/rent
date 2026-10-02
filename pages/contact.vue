<script setup lang="ts">
useSeoMeta({
  title: 'Контакты',
  description: 'Свяжитесь с GoodHome: телефон, WhatsApp, e-mail. Гостевые квартиры в Павлодаре.',
})
</script>

<template>
  <div class="container-page py-6 lg:py-12">
    <h1 class="anim-rise text-4xl lg:text-6xl">Контакты</h1>
    <p class="anim-rise mt-4 max-w-md text-muted" style="--d: 150ms">Напишите или позвоните — подберём квартиру на ваши даты.</p>

    <div class="mt-10 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
      <div v-reveal class="flex flex-col gap-8">
        <div class="border-t border-line pt-5">
          <p class="text-muted">Телефон</p>
          <a :href="site.phoneHref" class="text-2xl font-light transition hover:text-brand">{{ site.phone }}</a>
        </div>
        <div class="border-t border-line pt-5">
          <p class="text-muted">Почта</p>
          <a :href="`mailto:${site.email}`" class="text-2xl font-light transition hover:text-brand">{{ site.email }}</a>
        </div>
        <div class="flex flex-wrap items-center gap-3 border-t border-line pt-5">
          <a :href="site.telegram" target="_blank" rel="noopener noreferrer" class="btn-primary">Написать в Telegram</a>
          <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="btn-secondary">WhatsApp</a>
          <SocialLinks :items="['instagram', 'booking']" class="ml-2" />
        </div>
      </div>

      <iframe
        :src="site.mapEmbed"
        v-reveal="150"
        title="Карта: где нас найти"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="h-[360px] w-full rounded-3xl border-0 lg:h-[480px]"
      />
    </div>
  </div>
</template>
