<script setup lang="ts">
import type { BookingResponse } from '#shared/types'
import { addDaysISO, nightsBetween, todayISO } from '#shared/utils/date'
import { formatPrice, pluralNights } from '#shared/utils/format'

const { state, close } = useBookingModal()
const apartment = computed(() => state.value?.apartment ?? null)
const today = todayISO()

const blank = () => ({
  name: '',
  phone: '',
  email: '',
  guests: 1,
  from: '',
  to: '',
  checkInTime: '14:00',
  checkOutTime: '12:00',
  comment: '',
  consent: false,
  website: '', // honeypot — человек это поле не видит
})

const form = reactive(blank())
const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'sending' | 'done' | 'error'>('idle')
const serverError = ref('')
const result = ref<BookingResponse | null>(null)
const nameInput = ref<HTMLInputElement | null>(null)
const showTimes = ref(false)

const nights = computed(() => nightsBetween(form.from, form.to))
const total = computed(() => (apartment.value ? nights.value * apartment.value.price : 0))
const minTo = computed(() => addDaysISO(form.from || today, 1))
const guestOptions = computed(() => Array.from({ length: apartment.value?.tenantLimit ?? 1 }, (_, i) => i + 1))

// При каждом открытии — чистая форма, предзаполненная датами из поиска (если были)
watch(state, async (s) => {
  if (!s) return
  Object.assign(form, blank(), {
    from: s.preset.from ?? '',
    to: s.preset.to ?? '',
    guests: Math.min(s.preset.guests ?? 1, s.apartment.tenantLimit),
  })
  Object.keys(errors).forEach((key) => delete errors[key])
  status.value = 'idle'
  showTimes.value = false
  serverError.value = ''
  result.value = null
  await nextTick()
  nameInput.value?.focus()
})

function onFromChange() {
  if (form.to && form.to <= form.from) form.to = ''
}

function validate(): boolean {
  Object.keys(errors).forEach((key) => delete errors[key])
  if (form.name.trim().length < 2) errors.name = 'Укажите имя'
  if (!/^\+?\d{10,15}$/.test(form.phone.replace(/[^\d+]/g, ''))) errors.phone = 'Укажите корректный телефон'
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Укажите корректный e-mail'
  if (!form.from) errors.from = 'Выберите дату заезда'
  if (!form.to) errors.to = 'Выберите дату выезда'
  else if (nights.value < 1) errors.to = 'Выезд должен быть позже заезда'
  if (!form.consent) errors.consent = 'Нужно согласие с условиями'
  return Object.keys(errors).length === 0
}

async function submit() {
  if (!apartment.value || status.value === 'sending' || !validate()) return
  status.value = 'sending'
  serverError.value = ''
  try {
    result.value = await $fetch<BookingResponse>('/api/bookings', {
      method: 'POST',
      body: { apartmentId: apartment.value.id, ...form },
    })
    status.value = 'done'
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    serverError.value = err.data?.message || 'Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в WhatsApp.'
    status.value = 'error'
  }
}

// Esc закрывает окно, фон не прокручивается, пока окно открыто
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && state.value) close()
}
watch(
  () => Boolean(state.value),
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="apartment"
      class="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center sm:p-4"
      @click.self="close"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        class="compact flex max-h-[100dvh] w-full max-w-[520px] flex-col rounded-t-3xl bg-paper sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl"
      >
        <!-- Шапка: название и закрытие -->
        <div class="flex items-center gap-3 px-5 pb-3 pt-5 sm:px-6">
          <NuxtImg
            :src="apartment.images[0]"
            alt=""
            width="96"
            height="96"
            class="h-12 w-12 flex-none rounded-xl object-cover"
          />
          <div class="min-w-0 flex-1">
            <h2 id="booking-title" class="truncate text-xl font-normal leading-tight">{{ apartment.title }}</h2>
            <p class="truncate text-sm text-muted">{{ apartment.address }} · до {{ apartment.tenantLimit }} гостей</p>
          </div>
          <button
            type="button"
            class="-mr-2 flex h-10 w-10 flex-none items-center justify-center rounded-full text-3xl leading-none text-muted hover:text-ink"
            aria-label="Закрыть"
            @click="close"
          >
            ×
          </button>
        </div>

        <!-- Успех -->
        <div v-if="status === 'done' && result" class="flex flex-col items-center gap-4 px-5 pb-8 pt-4 text-center sm:px-6">
          <p class="text-2xl font-light text-brand">Заявка отправлена</p>
          <p v-if="result.nights">
            {{ pluralNights(result.nights) }} · {{ formatPrice(result.total) }}. Мы свяжемся с вами, чтобы
            подтвердить бронь. Оплата — при заселении.
          </p>
          <button type="button" class="btn-primary" @click="close">Закрыть</button>
        </div>

        <!-- Форма: поля прокручиваются, кнопки всегда внизу -->
        <form v-else class="flex min-h-0 flex-1 flex-col" novalidate @submit.prevent="submit">
          <div class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 pb-4 sm:px-6">
            <div class="grid grid-cols-2 gap-3">
              <label class="flex flex-col gap-1 text-sm text-muted">
                Заезд
                <input v-model="form.from" type="date" :min="today" class="field" @change="onFromChange" />
                <span v-if="errors.from" class="text-red-700">{{ errors.from }}</span>
              </label>
              <label class="flex flex-col gap-1 text-sm text-muted">
                Выезд
                <input v-model="form.to" type="date" :min="minTo" class="field" />
                <span v-if="errors.to" class="text-red-700">{{ errors.to }}</span>
              </label>
            </div>

            <div>
              <button
                type="button"
                class="text-sm text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
                :aria-expanded="showTimes"
                @click="showTimes = !showTimes"
              >
                {{ showTimes ? 'Скрыть время' : `Время: заезд с ${form.checkInTime}, выезд до ${form.checkOutTime} — изменить` }}
              </button>
              <div v-if="showTimes" class="mt-3 grid grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm text-muted">
                  Время заезда
                  <input v-model="form.checkInTime" type="time" step="1800" class="field" />
                </label>
                <label class="flex flex-col gap-1 text-sm text-muted">
                  Время выезда
                  <input v-model="form.checkOutTime" type="time" step="1800" class="field" />
                </label>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <label class="flex flex-col gap-1 text-sm text-muted">
                Имя
                <input ref="nameInput" v-model="form.name" type="text" autocomplete="name" class="field" />
                <span v-if="errors.name" class="text-red-700">{{ errors.name }}</span>
              </label>
              <label class="flex flex-col gap-1 text-sm text-muted">
                Телефон
                <input v-model="form.phone" type="tel" autocomplete="tel" placeholder="+7" class="field" />
                <span v-if="errors.phone" class="text-red-700">{{ errors.phone }}</span>
              </label>
              <label class="flex flex-col gap-1 text-sm text-muted">
                E-mail (необязательно)
                <input v-model="form.email" type="email" autocomplete="email" class="field" />
                <span v-if="errors.email" class="text-red-700">{{ errors.email }}</span>
              </label>
              <label class="flex flex-col gap-1 text-sm text-muted">
                Гости
                <select v-model.number="form.guests" class="field">
                  <option v-for="n in guestOptions" :key="n" :value="n">{{ n }}</option>
                </select>
              </label>
            </div>

            <label class="flex flex-col gap-1 text-sm text-muted">
              Пожелания
              <textarea v-model="form.comment" rows="2" maxlength="1000" class="field" />
            </label>

            <!-- Honeypot: скрыто от людей, боты его заполняют -->
            <input
              v-model="form.website"
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="absolute left-[-9999px]"
            />

            <div>
              <label class="flex items-start gap-2 text-sm">
                <input v-model="form.consent" type="checkbox" class="mt-1" />
                <span>Согласен с условиями пользовательского соглашения</span>
              </label>
              <span v-if="errors.consent" class="text-sm text-red-700">{{ errors.consent }}</span>
            </div>

            <p v-if="status === 'error'" class="rounded-2xl bg-red-50 p-3 text-sm text-red-700" role="alert">{{ serverError }}</p>
          </div>

          <!-- Итог и кнопки — вне прокрутки, видны всегда -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-6">
            <div class="leading-tight">
              <template v-if="nights > 0">
                <p class="text-xl font-medium">{{ formatPrice(total) }}</p>
                <p class="text-sm text-muted">{{ pluralNights(nights) }} × {{ formatPrice(apartment.price) }} · оплата при заселении</p>
              </template>
              <template v-else>
                <p class="text-xl font-medium">{{ formatPrice(apartment.price) }}</p>
                <p class="text-sm text-muted">за сутки · выберите даты</p>
              </template>
            </div>
            <div class="flex gap-2">
              <button type="button" class="btn-secondary" @click="close">Отмена</button>
              <button type="submit" class="btn-primary" :disabled="status === 'sending'">
                {{ status === 'sending' ? 'Отправляем…' : 'Забронировать' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* В окне бронирования поля ниже, чем на страницах, чтобы всё помещалось на экран */
.compact .field {
  min-height: 2.5rem;
  padding-block: 0.5rem;
}
.compact .btn-primary,
.compact .btn-secondary {
  min-height: 2.75rem;
  padding-inline: 1.25rem;
}
</style>
