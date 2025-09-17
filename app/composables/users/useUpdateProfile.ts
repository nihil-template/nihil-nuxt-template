import type { UpdateUserType, UserInfoType } from '@/schemas/user.schema';
import { toast } from 'vue-sonner';

import { useUsersStore } from '~/entities/users/users.store';
import { getToastStyle } from '~/libs/getToastStyle';

export function useUpdateProfile() {
  const usersStore = useUsersStore();

  return usePut<UpdateUserType, UserInfoType>({
    url: [ 'users', 'profile', ],
    success(res) {
      console.log(res);

      toast.success(res.message, {
        style: getToastStyle('success'),
      });

      // 서버 응답 전체를 usersStore.updateProfile에 전달 (캐시 무효화도 내부에서 처리)
      usersStore.updateProfile(res);
    },
    error(res) {
      console.log(res);

      toast.error(res.message, {
        style: getToastStyle('error'),
      });
    },
  });
}
