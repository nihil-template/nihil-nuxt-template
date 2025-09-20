import { useToast } from 'primevue/usetoast';

import type { ResetPasswordForbodyType, UserInfoType } from '@/schemas/user.schema';

export function useResetPassword() {
  const toast = useToast();
  const router = useRouter();

  return usePost<ResetPasswordForbodyType, UserInfoType>({
    url: [ 'auth', 'reset-password', ],
    success(res) {
      console.log(res);

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

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
