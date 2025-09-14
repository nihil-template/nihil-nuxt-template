<script setup lang="ts">
definePageMeta({
  layout: 'profile-layout',
});

useSetMeta({
  title: '비밀번호 변경',
  url: '/profile/edit/change-password',
});
</script>

<template>
  <ChangePasswordForm />
</template>
