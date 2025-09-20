<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

useSetMeta({
  title: '로그인',
  url: '/auth/signin',
});
</script>

<template>
  <SignInForm />
</template>
