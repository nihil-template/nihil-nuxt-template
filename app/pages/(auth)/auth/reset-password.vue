<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

useSetMeta({
  title: '비밀번호 재설정',
  url: '/auth/reset-password',
});

const route = useRoute();

// token 쿼리스트링 파라미터 가져오기
const resetToken = computed(() => {
  const token = route.query.token;
  return typeof token === 'string' ? token : '';
});

// 세션 스토리지에서 이메일 가져오기
const resetEmail = ref('');

// 토큰이 없으면 forgot-password 페이지로 리다이렉트
watch(resetToken, (token) => {
  if (!token) {
    navigateTo('/auth/forgot-password');
  }
}, { immediate: true });

// 클라이언트에서 세션 스토리지에서 이메일 가져오기
onMounted(() => {
  if (process.client) {
    const email = sessionStorage.getItem('resetPasswordEmail');
    if (email) {
      resetEmail.value = email;
    }
    else {
      // 이메일이 없으면 forgot-password 페이지로 리다이렉트
      navigateTo('/auth/forgot-password');
    }
  }
});
</script>

<template>
  <div>
    <ResetPasswordForm
      v-if='resetToken && resetEmail'
      :reset-token='resetToken'
      :email='resetEmail'
    />
  </div>
</template>
