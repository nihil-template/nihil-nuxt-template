<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

useSetMeta({
  title: '비밀번호 재설정 요청',
  url: '/auth/forgot-password',
});
</script>

<template>
  <ForgotPasswordForm />
</template>
