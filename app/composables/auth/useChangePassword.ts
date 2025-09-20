import { useToast } from 'primevue/usetoast';

import { useAuthStore } from '~/entities/auth/auth.store';

import type { ChangePasswordType, UserInfoType } from '@/schemas/user.schema';
type ChangePasswordBodyType = Omit<ChangePasswordType, 'confirmPassword'>;

export function useChangePassword() {
  const toast = useToast();
  const authStore = useAuthStore();

  return usePost<ChangePasswordBodyType, UserInfoType>({
    url: [ 'auth', 'change-password', ],
    success(res) {
      console.log(res);

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      // 비밀번호 변경 후 세션 업데이트 (서버 응답 전체 전달)
      authStore.updateSession(res);
    },
    error(res) {
      console.log(res);

      toast.add({
        severity: 'error',
        summary: res.message,
        life: 3000,
      });
    },
  });
}
