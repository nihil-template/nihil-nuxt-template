import type { CreateUserType, UserInfoType } from '@repo/drizzle';
import { toast } from 'vue-sonner';

import { usePost } from '~/composables/common/api/useAPIMutation';
import { getToastStyle } from '~/libs/getToastStyle';

export function useSignUp() {
  const router = useRouter();

  const response = usePost<CreateUserType, UserInfoType>({
    url: [ 'auth', 'signup', ],
    success(res) {
      console.log(res);
      toast.success(res.message, {
        style: getToastStyle('success'),
      });

      router.push('/auth/signin');
    },
    error(res) {
      console.log(res);
      toast.error(res.message, {
        style: getToastStyle('error'),
      });
    },
  });

  return response;
}
