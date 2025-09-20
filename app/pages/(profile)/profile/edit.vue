<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useSetMeta({
  title: '프로필 수정',
  url: '/profile/edit',
});
</script>

<template>
  <ProfileEditForm />
</template>
