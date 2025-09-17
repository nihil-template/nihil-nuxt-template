<script setup lang="ts">
import { config } from '@/config/config';
</script>

<template>
  <NuxtLink
    to='/'
    class='flex items-center gap-3 hover:opacity-80 transition-opacity'
  >
    <!-- 로고 이미지가 들어갈 곳. -->
    <div class='w-12 h-12 rounded-8 bg-primary' />

    <div class='space-y-1'>
      <h1 class='text-h5 font-bold text-foreground leading-tight'>
        {{ config.site.title || '프로젝트명' }}
      </h1>
      <p class='text-sm text-muted-foreground leading-tight'>
        {{ config.site.description || '프로젝트 설명' }}
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* AppLogo 컴포넌트 스타일 */
</style>
