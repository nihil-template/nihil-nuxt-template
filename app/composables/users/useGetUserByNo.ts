import { useToast } from 'primevue/usetoast';

import { useUsersStore } from '~/entities/users/users.store';

import type { UserInfoType } from '@/schemas/user.schema';

export function useGetUserByNo(userNo: number) {
  const toast = useToast();
  const usersStore = useUsersStore();

  const { data, ...other } = useGet<UserInfoType>({
    url: [ 'users', userNo, ],
    success(response) {
      console.log(response);

      if (response.data) {
        usersStore.cacheUserByNo(response, userNo);
        toast.add({
          severity: 'success',
          summary: response.message,
          life: 3000,
        });
      }
    },
    error(response) {
      console.log(response);
      toast.add({
        severity: 'error',
        summary: response.message,
        life: 3000,
      });
    },
  });

  return {
    response: data,
    ...other,
  };
}
