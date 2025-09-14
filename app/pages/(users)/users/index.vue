<script setup lang="ts">
// 메타데이터 설정
useSetMeta({
  title: '사용자 목록',
  url: '/users',
});

definePageMeta({
  layout: 'users-layout',
});
</script>

<template>
  <UsersPage />
</template>
