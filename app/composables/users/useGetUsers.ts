import { useToast } from 'primevue/usetoast';

import { useUsersStore } from '~/entities/users/users.store';

import type { ListType } from '@/schemas/response.schema';
import type { UserInfoType, SearchUserType } from '@/schemas/user.schema';

export function useGetUsers(params?: SearchUserType) {
  const toast = useToast();
  const usersStore = useUsersStore();

  const { data, ...other } = useGet<ListType<UserInfoType>>({
    url: [ 'users', ],
    params,
    immediate: false,
    success(response) {
      console.log(response);

      if (response.data) {
        usersStore.cacheUsersSearch(response, params || {});
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
