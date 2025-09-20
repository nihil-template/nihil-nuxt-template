import { useUsersStore } from '~/entities/users/users.store';

import type { UserInfoType } from '@/schemas/user.schema';

export function useGetUserByEmail(emlAddr: string) {
  const toast = useToast();
  const usersStore = useUsersStore();

  const { data, ...other } = useGet<UserInfoType>({
    url: [ 'users', 'email', emlAddr, ],
    success(res) {
      console.log(res);

      if (res.data) {
        usersStore.cacheUserByEmail(res, emlAddr);
      }

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });
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

  return {
    response: data,
    ...other,
  };
}
