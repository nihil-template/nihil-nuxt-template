<script setup lang="ts">
// 관리자 전용 레이아웃 - 관리자 기능에 특화된 레이아웃
</script>

<template>
  <div class='admin-layout-container'>
    <AdminHeader />
    <AdminContent>
      <slot />
    </AdminContent>
    <AdminFooter />
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.admin-layout-container {
  @apply min-h-screen flex flex-col bg-gray-50;
}
</style>