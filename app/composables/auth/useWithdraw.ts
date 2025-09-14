import type { WithdrawType, UserInfoType } from '@repo/drizzle';
import { toast } from 'vue-sonner';

import { useAuthStore } from '~/entities/auth/auth.store';
import { getToastStyle } from '~/libs/getToastStyle';

export function useWithdraw() {
  const router = useRouter();
  const authStore = useAuthStore();

  return useDelete<WithdrawType, UserInfoType>({
    url: [ 'auth', 'withdraw', ],
    success(res) {
      console.log(res);

      toast.success(res.message, {
        style: getToastStyle('success'),
      });

      // 탈퇴 처리 - 스토어에서 직접 처리
      authStore.withdraw();

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
