import { useToast } from 'primevue/usetoast';

import { usePost } from '~/composables/common/api/useAPIMutation';

import type { CreateUserType, UserInfoType } from '@/schemas/user.schema';

export function useSignUp() {
  const toast = useToast();
  const router = useRouter();

  const response = usePost<CreateUserType, UserInfoType>({
    url: [ 'auth', 'signup', ],
    success(res) {
      console.log(res);
      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      router.push('/auth/signin');
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

  return response;
}
