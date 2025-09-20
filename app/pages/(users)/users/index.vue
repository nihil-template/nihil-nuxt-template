<script setup lang="ts">
definePageMeta({
  layout: 'users-layout',
});

useSetMeta({
  title: '사용자 목록',
  url: '/users',
});
</script>

<template>
  <UserList />
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

h1 {
  @apply text-h3 font-bold mb-6;
}

.loading-fallback {
  @apply flex items-center gap-3;
}

.spinner-fallback {
  @apply inline-block w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin;
}
</style>
