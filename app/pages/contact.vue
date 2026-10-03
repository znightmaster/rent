<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('contact.seoTitle'),
  description: () => t('contact.seoDescription'),
})

// Способы связи. Telegram — основной канал, его плитка выделена бирюзовым (главное действие)
type Channel = { icon: 'telegram' | 'whatsapp' | 'phone' | 'mail'; title: string; value: string; hint: string; href: string; external?: boolean; main?: boolean }
const channels = computed<Channel[]>(() => [
  { icon: 'telegram', title: t('contact.channels.telegram.title'), value: t('contact.channels.telegram.value'), hint: t('contact.channels.telegram.hint'), href: site.telegram, external: true, main: true },
  { icon: 'whatsapp', title: t('contact.channels.whatsapp.title'), value: t('contact.channels.whatsapp.value'), hint: t('contact.channels.whatsapp.hint'), href: site.whatsapp, external: true },
  { icon: 'phone', title: t('contact.channels.phone.title'), value: site.phone, hint: t('contact.channels.phone.hint'), href: site.phoneHref },
  { icon: 'mail', title: t('contact.channels.mail.title'), value: site.email, hint: t('contact.channels.mail.hint'), href: `mailto:${site.email}` },
])

const steps = computed(() =>
  (['choose', 'confirm', 'arrive'] as const).map((key) => ({
    title: t(`contact.steps.${key}.title`),
    text: t(`contact.steps.${key}.text`),
  })),
)
</script>

<template>
  <div class="container-page py-6 lg:py-12">
    <h1 class="text-4xl lg:text-6xl">{{ t('contact.title') }}</h1>
    <p class="mt-4 max-w-md text-lg text-muted">{{ t('contact.lead') }}</p>

    <!-- Способы связи: вся плитка — ссылка -->
    <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      <li v-for="c in channels" :key="c.icon">
        <a
          :href="c.href"
          :target="c.external ? '_blank' : undefined"
          :rel="c.external ? 'noopener noreferrer' : undefined"
          class="group flex h-full flex-col gap-5 rounded-3xl p-7 transition duration-300 hover:-translate-y-1"
          :class="c.main ? 'bg-brand text-white hover:bg-brand-dark' : 'border border-line bg-white hover:border-rose'"
        >
          <!-- Значок-арка — дверь из логотипа -->
          <span
            class="flex h-14 w-12 items-center justify-center rounded-b-lg rounded-t-full"
            :class="c.main ? 'bg-white/15 text-white' : 'bg-rose-soft text-brand'"
            aria-hidden="true"
          >
            <SocialIcon :name="c.icon" :size="c.icon === 'phone' || c.icon === 'mail' ? 22 : 24" />
          </span>
          <span class="flex flex-col gap-1">
            <span class="text-sm" :class="c.main ? 'text-white/75' : 'text-muted'">{{ c.title }}</span>
            <span class="break-all text-xl" :class="c.main ? '' : 'transition group-hover:text-rose-dark'">{{ c.value }}</span>
          </span>
          <span class="mt-auto text-sm" :class="c.main ? 'text-white/75' : 'text-muted'">{{ c.hint }}</span>
        </a>
      </li>
    </ul>

    <!-- Как проходит бронирование -->
    <section class="mt-24" aria-labelledby="steps-title">
      <h2 id="steps-title" class="mb-8 text-3xl lg:text-4xl">{{ t('contact.stepsTitle') }}</h2>
      <ol class="grid gap-8 md:grid-cols-3 md:gap-10">
        <li v-for="(step, i) in steps" :key="step.title" class="flex gap-5 border-t border-line pt-6 md:flex-col md:gap-4">
          <span class="text-5xl font-light leading-none text-rose-dark" aria-hidden="true">{{ i + 1 }}</span>
          <span>
            <span class="block text-xl">{{ step.title }}</span>
            <span class="mt-2 block text-muted">{{ step.text }}</span>
          </span>
        </li>
      </ol>
    </section>

    <!-- Фото и отзывы -->
    <section
      class="mt-24 flex flex-col gap-6 rounded-3xl bg-rose-soft px-7 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-12"
      aria-labelledby="more-title"
    >
      <div>
        <h2 id="more-title" class="text-2xl lg:text-3xl">{{ t('contact.moreTitle') }}</h2>
        <p class="mt-2 max-w-md text-muted">{{ t('contact.moreText') }}</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a :href="site.instagram" target="_blank" rel="noopener noreferrer" class="btn-secondary gap-2.5">
          <SocialIcon name="instagram" :size="20" />
          Instagram
        </a>
        <a :href="site.booking" target="_blank" rel="noopener noreferrer" class="btn-secondary gap-2.5">
          <SocialIcon name="booking" :size="20" />
          Booking
        </a>
      </div>
    </section>
  </div>
</template>
