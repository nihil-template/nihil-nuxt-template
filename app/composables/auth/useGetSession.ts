import type { UserInfoType } from '@/schemas/user.schema';
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '~/entities/auth/auth.store';
import { useCacheStore } from '~/entities/common/cache.store';

/**
 * @description 세션 정보를 가져오고 관리하는 컴포저블 훅
 *
 * Pinia 스토어의 세션 상태를 단일 출처로 사용하며,
 * 캐시된 세션의 유효성을 검사하고 필요시에만 API 요청을 수행합니다.
 */
export function useGetSession() {
  const authStore = useAuthStore();
  const cacheStore = useCacheStore();
  const { session, } = storeToRefs(authStore);

  const {
    trigger,
    cacheKey,
    utils,
    ...other
  } = useGet<UserInfoType>({
    url: [ 'auth', 'session', ],
    ttl: 60,
    immediate: false,
    success(res) {
      if (res.data) {
        authStore.cacheSession(res, 60);
      }
    },
    error(res) {
      if (
        res
        && typeof res === 'object'
        && 'status' in res
        && res.status === 401
      ) {
        authStore.signout();
      }
    },
  });

  if (import.meta.client) {
    authStore.restoreSession();

    const entry = cacheStore.getEntry([ 'auth', 'session', ]);
    const now = DateTime.now();
    let needsRefresh = true;

    if (entry) {
      const expiresAt = DateTime.fromMillis(entry.expiresAt);
      if (now < expiresAt) {
        needsRefresh = false;
      }
    }

    if (needsRefresh) {
      trigger();
    }
  }

  return {
    session,
    trigger,
    cacheKey,
    utils,
    ...other,
  };
}
