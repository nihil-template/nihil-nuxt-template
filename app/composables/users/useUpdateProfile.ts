import { useToast } from 'primevue/usetoast';

import { useUsersStore } from '~/entities/users/users.store';

import type { UpdateUserType, UserInfoType } from '@/schemas/user.schema';

export function useUpdateProfile() {
  const toast = useToast();
  const usersStore = useUsersStore();

  return usePut<UpdateUserType, UserInfoType>({
    url: [ 'users', 'profile', ],
    success(res) {
      console.log(res);

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      // 서버 응답 전체를 usersStore.updateProfile에 전달 (캐시 무효화도 내부에서 처리)
      usersStore.updateProfile(res);
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
}
