<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
});

useSetMeta({
  title: '관리자 페이지',
  url: '/admin',
});
</script>

<template>
  <AdminDashboard />
</template>
