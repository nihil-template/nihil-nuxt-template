import type { ChangePasswordType, UserInfoType } from '@repo/drizzle';
import { toast } from 'vue-sonner';

import { useAuthStore } from '~/entities/auth/auth.store';
import { getToastStyle } from '~/libs/getToastStyle';

export function useChangePassword() {
  const authStore = useAuthStore();

  return usePost<ChangePasswordType, UserInfoType>({
    url: [ 'auth', 'change-password', ],
    success(res) {
      console.log(res);

      toast.success(res.message, {
        style: getToastStyle('success'),
      });

      // 비밀번호 변경 후 세션 업데이트 (서버 응답 전체 전달)
      authStore.updateSession(res);
    },
    error(res) {
      console.log(res);

      toast.error(res.message, {
        style: getToastStyle('error'),
      });
    },
  });
}
