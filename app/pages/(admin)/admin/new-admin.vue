<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
});

useSetMeta({
  title: '신규 관리자 추가',
  url: '/admin/new-admin',
});
</script>

<template>
  <NewAdminForm />
</template>
