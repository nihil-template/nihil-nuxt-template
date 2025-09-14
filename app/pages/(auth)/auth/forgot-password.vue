<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

useSetMeta({
  title: '비밀번호 찾기',
  url: '/auth/forgot-password',
});
</script>

<template>
  <ForgotPasswordForm />
</template>
