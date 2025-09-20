<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useSetMeta({
  title: '비밀번호 변경',
  url: '/profile/change-password',
});
</script>

<template>
  <ChangePasswordForm />
</template>
