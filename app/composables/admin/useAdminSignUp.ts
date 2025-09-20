import { useToast } from 'primevue/usetoast';

import type { CreateUserType, UserInfoType } from '@/schemas/user.schema';

type AdminSignUpBodyType = Omit<CreateUserType, 'passwordConfirm'>;

export function useAdminSignUp() {
  const toast = useToast();
  const router = useRouter();

  const response = usePost<AdminSignUpBodyType, UserInfoType>({
    url: [ 'admin', 'signup', ],
    success(res) {
      console.log(res);

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      // 관리자 계정 생성 후 로그인 페이지로 이동
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
