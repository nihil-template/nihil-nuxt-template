<script setup lang="ts">
// 메인 콘텐츠 영역 - 페이지의 주요 내용이 표시되는 곳
</script>

<template>
  <main>
    <slot />
  </main>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

main {
  @apply flex-1 p-6 bg-white overflow-auto;
}
</style>