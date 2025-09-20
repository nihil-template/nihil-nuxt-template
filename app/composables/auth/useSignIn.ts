import { useToast } from 'primevue/usetoast';

import { useAuthStore } from '~/entities/auth/auth.store';

import type { SignInType, UserInfoType } from '@/schemas/user.schema';

export function useSignIn() {
  const router = useRouter();
  const toast = useToast();

  const authStore = useAuthStore();

  return usePost<SignInType, UserInfoType>({
    url: [ 'auth', 'signin', ],
    freshTTL: 60,
    success(res) {
      console.log(res);

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      authStore.cacheSession(res, 60);

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
