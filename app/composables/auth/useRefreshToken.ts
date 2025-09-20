import { useToast } from 'primevue/usetoast';

import { useAuthStore } from '~/entities/auth/auth.store';

import type { UserInfoType } from '@/schemas/user.schema';

export function useRefreshToken() {
  const toast = useToast();
  const authStore = useAuthStore();

  return usePost<null, UserInfoType>({
    url: [ 'auth', 'refresh', ],
    success(res) {
      console.log(res);

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      // 토큰 재발급 후 세션 업데이트
      authStore.refreshSession(res);
    },
    error(res) {
      console.log(res);

      toast.add({
        severity: 'error',
        summary: res.message,
        life: 3000,
      });

      // 토큰 재발급 실패 시 로그아웃 처리
      authStore.signout();
    },
  });
}
