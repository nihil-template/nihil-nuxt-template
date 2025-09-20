import { storeToRefs } from 'pinia';

import { useAuthStore } from '~/entities/auth/auth.store';

/**
 * 전역 인증 미들웨어 - 모든 페이지에 자동 적용
 */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;

  // 인증이 필요 없는 공개 페이지들
  const publicRoutes = [
    '/',
    '/auth/signin',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/reset-password',
  ];

  // 공개 페이지는 인증 검사 생략
  if (publicRoutes.includes(to.path)) {
    return;
  }

  const authStore = useAuthStore();
  const { session } = storeToRefs(authStore);

  // 먼저 캐시에서 세션 복원 시도
  authStore.restoreSession();

  // 세션이 없으면 로그인 페이지로 리다이렉트
  if (!session.value) {
    return navigateTo('/auth/signin');
  }
});