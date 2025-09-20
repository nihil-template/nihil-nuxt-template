<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useSetMeta({
  title: '회원탈퇴',
  url: '/profile/withdraw',
});
</script>

<template>
  <WithdrawForm />
</template>
