import type { CreateUserType, UserInfoType } from '@repo/drizzle';
import { toast } from 'vue-sonner';

import { getToastStyle } from '~/libs/getToastStyle';

export function useAdminSignUp() {
  const router = useRouter();

  const response = usePost<CreateUserType, UserInfoType>({
    url: [ 'admin', 'signup', ],
    success(res) {
      console.log(res);

      toast.success(res.message, {
        style: getToastStyle('success'),
      });

      // 관리자 계정 생성 후 로그인 페이지로 이동
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
