<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

useSetMeta({
  title: '새 비밀번호 설정',
  url: '/auth/reset-password',
});
</script>

<template>
  <Suspense>
    <ResetPasswordForm />
    <template #fallback>
      <Loading text='로딩 중...' />
    </template>
  </Suspense>
</template>
