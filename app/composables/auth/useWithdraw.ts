import { useToast } from 'primevue/usetoast';

import { useAuthStore } from '~/entities/auth/auth.store';

import type { WithdrawType, UserInfoType } from '@/schemas/user.schema';

type WithdrawBodyType = Omit<WithdrawType, 'passwordConfirm'>;

export function useWithdraw() {
  const toast = useToast();
  const router = useRouter();
  const authStore = useAuthStore();

  return useDelete<WithdrawBodyType, UserInfoType>({
    url: [ 'auth', 'withdraw', ],
    success(res) {
      console.log(res);

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      // 탈퇴 처리 - 스토어에서 직접 처리
      authStore.withdraw();

      router.push('/');
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
