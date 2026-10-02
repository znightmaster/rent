<template>
  <a
    :href="site.whatsapp"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Написать в WhatsApp"
    class="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_-10px_rgba(40,120,136,0.7)] transition hover:bg-brand-dark"
  >
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  </a>
</template>
