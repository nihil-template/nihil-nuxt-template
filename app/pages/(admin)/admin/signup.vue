<script setup lang="ts">
useSetMeta({
  title: '관리자 계정 생성',
  url: '/admin/signup',
});

definePageMeta({
  layout: 'admin-layout',
});
</script>

<template>
  <AdminSignupForm />
</template>
