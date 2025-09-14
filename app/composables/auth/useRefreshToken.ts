import type { UserInfoType } from '@repo/drizzle';

import { useAuthStore } from '~/entities/auth/auth.store';

export function useRefreshToken() {
  const authStore = useAuthStore();

  return usePost<null, UserInfoType>({
    url: [ 'auth', 'refresh', ],
    success(res) {
      console.log(res);

      // 토큰 재발급 후 세션 업데이트
      authStore.refreshSession(res);
    },
    error(res) {
      console.log(res);

      // 토큰 재발급 실패 시 로그아웃 처리
      authStore.signout();
    },
  });
}
