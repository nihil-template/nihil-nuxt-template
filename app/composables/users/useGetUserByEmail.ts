import { toast } from 'vue-sonner';

import { useUsersStore } from '~/entities/users/users.store';
import { getToastStyle } from '~/libs/getToastStyle';

import type { UserInfoType } from '@/schemas/user.schema';

export function useGetUserByEmail(emlAddr: string) {
  const usersStore = useUsersStore();

  const { data, ...other } = useGet<UserInfoType>({
    url: [ 'users', 'email', emlAddr, ],
    success(response) {
      console.log(response);

      if (response.data) {
        usersStore.cacheUserByEmail(response, emlAddr);
        toast.success('사용자 정보를 성공적으로 조회했습니다.', {
          style: getToastStyle('success'),
        });
      }
    },
    error(response) {
      console.log(response);
      toast.error(response?.message || '사용자 정보 조회에 실패했습니다.', {
        style: getToastStyle('error'),
      });
    },
  });

  return {
    response: data,
    ...other,
  };
}
