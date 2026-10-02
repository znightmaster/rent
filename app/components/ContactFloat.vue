<!-- Плавающие кнопки связи справа. Telegram — основной канал (крупнее и ниже, ближе к большому пальцу). -->
<template>
  <div class="fixed bottom-5 right-5 z-30 flex flex-col items-center gap-3">
    <a
      :href="site.whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      class="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-brand shadow-[0_10px_30px_-12px_rgba(36,52,59,0.5)] transition duration-300 hover:scale-110 hover:text-[#25D366] focus-visible:text-[#25D366]"
    >
      <SocialIcon name="whatsapp" :size="26" />
    </a>
    <a
      :href="site.telegram"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      class="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white text-brand shadow-[0_10px_30px_-12px_rgba(36,52,59,0.5)] transition duration-300 hover:scale-110 hover:text-[#229ED9] focus-visible:text-[#229ED9]"
    >
      <SocialIcon name="telegram" :size="36" />
    </a>
  </div>
</template>
