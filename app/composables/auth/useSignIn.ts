import type { SignInType, UserInfoType } from '@/schemas/user.schema';
import { toast } from 'vue-sonner';

import { useAuthStore } from '~/entities/auth/auth.store';
import { getToastStyle } from '~/libs/getToastStyle';

export function useSignIn() {
  const router = useRouter();

  const authStore = useAuthStore();

  return usePost<SignInType, UserInfoType>({
    url: [ 'auth', 'signin', ],
    freshTTL: 60,
    success(res) {
      console.log(res);

      toast.success(res.message, {
        style: getToastStyle('success'),
      });

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
