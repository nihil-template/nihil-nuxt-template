import type { UserInfoType, ResponseType } from '@repo/drizzle';

import { useCacheStore } from '~/entities/common/cache.store';

export const useAdminStore = defineStore('admin', () => {
  const cacheStore = useCacheStore();

  function createAdmin(response: ResponseType<UserInfoType>) {
    const newAdmin = response.data;
    if (!newAdmin) return;

    cacheStore.replace(
      [ 'users', newAdmin.userNo!, ],
      response,
      60
    );

    cacheStore.replace(
      [ 'users', 'email', newAdmin.emlAddr, ],
      response,
      60
    );
  }

  function clearAllAdminsCache() {
    cacheStore.remove([ 'users', ]);
  }

  return {
    createAdmin,
    clearAllAdminsCache,
  };
});
