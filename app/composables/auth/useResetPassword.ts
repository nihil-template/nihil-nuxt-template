import type { ResetPasswordType, UserInfoType } from '@/schemas/user.schema';
import { toast } from 'vue-sonner';

import { useAuthStore } from '~/entities/auth/auth.store';
import { getToastStyle } from '~/libs/getToastStyle';

export function useResetPassword() {
  const router = useRouter();
  const authStore = useAuthStore();

  return usePost<ResetPasswordType, UserInfoType>({
    url: [ 'auth', 'reset-password', ],
    success(res) {
      console.log(res);

      toast.success(res.message, {
        style: getToastStyle('success'),
      });

      // 비밀번호 재설정 후 자동 로그인 처리 (서버 응답 전체 전달)
      authStore.cacheSession(res, 60);

      router.push('/');
    },
    error(res) {
      console.log(res);

      toast.error(res.message, {
        style: getToastStyle('error'),
      });
    },
  });
}
