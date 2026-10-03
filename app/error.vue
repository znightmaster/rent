<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()
const is404 = computed(() => props.error.statusCode === 404)
const goHome = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-5 bg-paper p-6 text-center">
    <img src="/logo.png" alt="GoodHome" width="206" height="315" class="h-20 w-auto" />
    <h1 class="text-4xl">{{ is404 ? t('error.notFound') : t('error.generic') }}</h1>
    <p class="max-w-md text-muted">{{ is404 ? t('error.notFoundText') : t('error.genericText') }}</p>
    <button type="button" class="btn-primary" @click="goHome">{{ t('error.home') }}</button>
  </div>
</template>
