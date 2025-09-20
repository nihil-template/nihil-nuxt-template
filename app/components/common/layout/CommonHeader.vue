<script setup lang="ts">
// 헤더 컴포넌트 - 타이틀과 네비게이션을 포함
</script>

<template>
  <header>
    <h1>title</h1>
    <CommonNav />
  </header>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

header {
  @apply flex items-center justify-between p-4 bg-white shadow-sm border-b;
}

h1 {
  @apply text-h3 font-bold text-gray-900;
}
</style>