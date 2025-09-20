<script setup lang="ts">
// 관리자 메인 콘텐츠 영역 - 사이드바와 메인 콘텐츠를 포함
</script>

<template>
  <div class='admin-content-container'>
    <AdminAside />
    <AdminMain>
      <slot />
    </AdminMain>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.admin-content-container {
  @apply flex flex-1 min-h-0;
}
</style>
