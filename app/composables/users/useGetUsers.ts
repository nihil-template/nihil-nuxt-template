import type { ListType, UserInfoType, SearchUserType } from '@repo/drizzle';
import { toast } from 'vue-sonner';

import { useUsersStore } from '~/entities/users/users.store';
import { getToastStyle } from '~/libs/getToastStyle';

export function useGetUsers(params?: SearchUserType) {
  const usersStore = useUsersStore();

  const { data, ...other } = useGet<ListType<UserInfoType>>({
    url: [ 'users', ],
    params,
    success(response) {
      console.log(response);

      if (response.data) {
        usersStore.cacheUsersSearch(response, params || {});
        toast.success('사용자 목록을 성공적으로 조회했습니다.', {
          style: getToastStyle('success'),
        });
      }
    },
    error(response) {
      console.log(response);
      toast.error(response?.message || '사용자 목록 조회에 실패했습니다.', {
        style: getToastStyle('error'),
      });
    },
  });

  return {
    response: data,
    ...other,
  };
}
