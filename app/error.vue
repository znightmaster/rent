<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-5 bg-paper p-6 text-center">
    <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-20 w-auto" />
    <h1 class="text-4xl">{{ is404 ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
    <p class="max-w-md text-muted">
      {{
        is404
          ? 'Возможно, адрес введён с ошибкой или квартира больше недоступна.'
          : 'Обновите страницу или вернитесь на главную.'
      }}
    </p>
    <button type="button" class="btn-primary" @click="goHome">На главную</button>
  </div>
</template>
