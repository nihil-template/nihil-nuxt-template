<script setup lang="ts">
// 관리자 헤더 컴포넌트 - 관리자 네비게이션과 사용자 정보
</script>

<template>
  <header>
    <div class='header-left'>
      <h1>관리자 대시보드</h1>
    </div>
    <AdminNav />
  </header>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

header {
  @apply flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200;
}

.header-left h1 {
  @apply text-h3 font-bold text-gray-900;
}
</style>
