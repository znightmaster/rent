<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#content"
      class="sr-only z-50 rounded-full bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {{ $t('nav.skip') }}
    </a>
    <AppHeader />
    <main id="content" class="flex flex-grow flex-col">
      <slot />
    </main>
    <AppFooter />
    <BookingModal />
    <ContactFloat />
  </div>
</template>
