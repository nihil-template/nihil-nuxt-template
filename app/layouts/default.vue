<script setup lang="ts">
// 기본 레이아웃 - 모듈화된 레이아웃 컴포넌트 사용
</script>

<template>
  <div class='layout-container'>
    <CommonHeader />
    <CommonContent>
      <slot />
    </CommonContent>
    <CommonFooter />
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.layout-container {
  @apply min-h-screen flex flex-col;
}
</style>
