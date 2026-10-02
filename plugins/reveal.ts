// Директива v-reveal: блок плавно выезжает, когда появляется на экране.
//   v-reveal            — без задержки
//   v-reveal="150"      — с задержкой 150 мс (удобно для «лесенки» из нескольких блоков)
// Уважает prefers-reduced-motion. Всё, что уже на экране при загрузке, не прячется (никаких «морганий»).
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (!('IntersectionObserver' in window)) return

      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) return

      el.classList.add('reveal')
      const delay = Number(binding.value ?? 0)
      if (delay) el.style.transitionDelay = `${delay}ms`

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          el.classList.add('reveal--in')
          observer.disconnect()
        },
        { rootMargin: '0px 0px -8% 0px' },
      )
      observer.observe(el)
      ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer
    },
    unmounted(el: HTMLElement) {
      ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver?.disconnect()
    },
  })
})
