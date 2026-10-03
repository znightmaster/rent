<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('about.seoTitle'),
  description: () => t('about.seoDescription'),
})

const inside = ['design', 'clean', 'contactless'] as const
const included = ['appliances', 'dishes', 'linen', 'soap', 'toothbrushes', 'slippers', 'internet'] as const

// icon — линейная иконка в арочном значке; stat — крупная цифра вместо иконки
const benefits = computed(() => [
  { icon: 'doc', title: t('about.benefits.doc.title'), text: t('about.benefits.doc.text') },
  { icon: 'card', title: t('about.benefits.card.title'), text: t('about.benefits.card.text') },
  { icon: 'percent', title: t('about.benefits.percent.title'), text: t('about.benefits.percent.text') },
  { stat: formatRating(site.stats.rating, locale.value), title: t('about.benefits.rating.title'), text: t('about.benefits.rating.text') },
])
</script>

<template>
  <div class="container-page py-6 lg:py-12">
    <!-- Первый экран -->
    <section class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
      <div class="flex flex-col gap-6">
        <p class="text-sm uppercase tracking-[0.2em] text-rose-dark">{{ t('about.eyebrow') }}</p>
        <h1 class="text-4xl lg:text-6xl">{{ t('about.title') }}</h1>
        <p class="max-w-xl text-lg text-muted">{{ t('about.lead') }}</p>
        <NuxtLinkLocale to="/apartments" class="btn-primary mt-2 w-fit">{{ t('common.choose') }}</NuxtLinkLocale>
      </div>
      <DoorImage src="/img/banner-12.webp" :alt="t('about.heroAlt')" reveal />
    </section>

    <!-- Квартиры: фото-арка и что внутри -->
    <section class="mt-24 grid items-center gap-10 md:grid-cols-[0.8fr_1fr] lg:mt-32 lg:gap-20" aria-labelledby="inside-title">
      <div class="relative mx-auto w-full max-w-sm md:max-w-none">
        <!-- Арочный верх — то же окно-дверь, что в логотипе -->
        <NuxtImg
          src="/img/banner-11.webp"
          :alt="t('about.kitchenAlt')"
          width="800"
          height="1000"
          sizes="100vw md:420px"
          loading="lazy"
          class="aspect-[4/5] w-full rounded-b-3xl rounded-t-full object-cover"
        />
        <span class="absolute -bottom-4 -right-2 rounded-full bg-white px-4 py-2 text-sm shadow-[0_10px_30px_-12px_rgba(36,52,59,0.4)] md:-right-6">
          {{ t('about.badge') }}
        </span>
      </div>

      <div class="flex flex-col gap-8">
        <h2 id="inside-title" class="text-3xl lg:text-4xl">{{ t('about.insideTitle') }}</h2>
        <div class="flex flex-col gap-5 text-muted">
          <p v-for="key in inside" :key="key">
            <span class="text-ink">{{ t(`about.inside.${key}.lead`) }}</span> {{ t(`about.inside.${key}.text`) }}
          </p>
        </div>
        <div>
          <p class="mb-3 font-medium">{{ t('about.includedTitle') }}</p>
          <ul class="flex flex-wrap gap-2">
            <li v-for="item in included" :key="item" class="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm">
              {{ t(`about.included.${item}`) }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Пара фото -->
    <div class="mt-24 grid gap-4 md:grid-cols-[1.35fr_1fr] lg:mt-32 lg:gap-5">
      <NuxtImg
        src="/img/banner-8.webp"
        :alt="t('about.livingAlt')"
        width="1200"
        height="900"
        sizes="100vw md:700px"
        loading="lazy"
        class="aspect-[4/3] h-full w-full rounded-3xl object-cover"
      />
      <NuxtImg
        src="/img/banner-9.webp"
        :alt="t('about.bedroomAlt')"
        width="900"
        height="900"
        sizes="100vw md:500px"
        loading="lazy"
        class="aspect-[4/3] h-full w-full rounded-3xl object-cover md:aspect-auto"
      />
    </div>

    <!-- Для гостей -->
    <section class="mt-24 lg:mt-32" aria-labelledby="benefits-title">
      <h2 id="benefits-title" class="mb-8 text-3xl lg:text-4xl">{{ t('about.benefitsTitle') }}</h2>
      <dl class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <div
          v-for="b in benefits"
          :key="b.title"
          class="flex flex-col gap-5 rounded-3xl p-7 transition duration-300"
          :class="b.stat ? 'bg-rose-soft' : 'border border-line bg-white hover:border-rose'"
        >
          <p v-if="b.stat" class="text-6xl font-light leading-none tracking-tight text-rose-dark" aria-hidden="true">{{ b.stat }}</p>
          <span v-else class="flex h-14 w-12 items-center justify-center rounded-b-lg rounded-t-full bg-rose-soft text-brand" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path v-if="b.icon === 'doc'" d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />
              <template v-else-if="b.icon === 'card'">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M3 10h18M7 14.5h3" />
              </template>
              <template v-else>
                <path d="M18.5 5.5l-13 13" />
                <circle cx="7.5" cy="7.5" r="2" />
                <circle cx="16.5" cy="16.5" r="2" />
              </template>
            </svg>
          </span>
          <div>
            <dt class="text-xl font-normal">{{ b.title }}</dt>
            <dd class="mt-2 text-muted">{{ b.text }}</dd>
          </div>
        </div>
      </dl>
    </section>

    <!-- Финал -->
    <section class="mt-24 flex flex-col items-center gap-6 rounded-3xl bg-rose-soft px-7 py-12 text-center lg:mt-32 lg:py-16">
      <h2 class="max-w-xl text-3xl lg:text-4xl">{{ t('about.ctaTitle') }}</h2>
      <p class="max-w-md text-muted">{{ t('about.ctaText') }}</p>
      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLinkLocale to="/apartments" class="btn-primary">{{ t('common.choose') }}</NuxtLinkLocale>
        <NuxtLinkLocale to="/contact" class="btn-secondary">{{ t('common.contactUs') }}</NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>
