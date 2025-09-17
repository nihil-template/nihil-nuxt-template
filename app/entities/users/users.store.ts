import type { UserInfoType, SearchUserType } from '@/schemas/user.schema';
import type { ListType, ResponseType } from '@/schemas/response.schema';

import { useAuthStore } from '~/entities/auth/auth.store';
import { useCacheStore } from '~/entities/common/cache.store';

export const useUsersStore = defineStore('users', () => {
  const cacheStore = useCacheStore();
  const authStore = useAuthStore();

  function invalidateUsersList(params?: SearchUserType) {
    if (params) {
      cacheStore.invalidate([ 'users', ], params);
    }
    else {
      cacheStore.remove([ 'users', ]);
    }
  }

  function invalidateUserByNo(userNo: number) {
    cacheStore.invalidate([ 'users', userNo, ]);
  }

  function invalidateUserByEmail(emlAddr: string) {
    cacheStore.invalidate([ 'users', 'email', emlAddr, ]);
  }

  function updateProfile(response: ResponseType<UserInfoType>) {
    const updatedUser = response.data;

    if (authStore.session && authStore.session.userNo === updatedUser?.userNo) {
      authStore.updateSession(response);
    }

    if (updatedUser) {
      invalidateUserByNo(updatedUser.userNo!);
      invalidateUserByEmail(updatedUser.emlAddr);
      invalidateUsersList();
    }
  }

  function createUser(response: ResponseType<UserInfoType>) {
    const newUser = response.data;
    if (!newUser) return;

    invalidateUsersList();

    cacheStore.replace(
      [ 'users', newUser.userNo!, ],
      response,
      60
    );

    cacheStore.replace(
      [ 'users', 'email', newUser.emlAddr, ],
      response,
      60
    );
  }

  function deleteUser(userNo: number, emlAddr: string) {
    invalidateUserByNo(userNo);
    invalidateUserByEmail(emlAddr);
    invalidateUsersList();
  }

  function cacheUsersSearch(response: ResponseType<ListType<UserInfoType>>, params: SearchUserType, ttlMinutes = 30) {
    cacheStore.replace(
      [ 'users', ],
      response,
      ttlMinutes,
      params
    );
  }

  function cacheUserByNo(response: ResponseType<UserInfoType>, userNo: number, ttlMinutes = 60) {
    cacheStore.replace(
      [ 'users', userNo, ],
      response,
      ttlMinutes
    );
  }

  function cacheUserByEmail(response: ResponseType<UserInfoType>, emlAddr: string, ttlMinutes = 60) {
    cacheStore.replace(
      [ 'users', 'email', emlAddr, ],
      response,
      ttlMinutes
    );
  }

  function clearAllUsersCache() {
    cacheStore.remove([ 'users', ]);
  }

  return {
    invalidateUsersList,
    invalidateUserByNo,
    invalidateUserByEmail,
    updateProfile,
    createUser,
    deleteUser,
    cacheUsersSearch,
    cacheUserByNo,
    cacheUserByEmail,
    clearAllUsersCache,
  };
});
