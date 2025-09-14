<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

// 메타데이터 설정
useSetMeta({
  title: '회원가입',
  url: '/auth/signup',
});
</script>

<template>
  <SignUpForm />
</template>
