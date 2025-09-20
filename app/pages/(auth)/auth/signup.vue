<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

useSetMeta({
  title: '회원가입',
  url: '/auth/signup',
});
</script>

<template>
  <SignUpForm />
</template>
