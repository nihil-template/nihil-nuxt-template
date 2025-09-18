import { toast } from 'vue-sonner';

import { useAuthStore } from '~/entities/auth/auth.store';
import { useCacheStore } from '~/entities/common/cache.store';
import { getToastStyle } from '~/libs/getToastStyle';

export function useSignOut() {
  const router = useRouter();
  const cacheStore = useCacheStore();
  const authStore = useAuthStore();

  return usePost<null, null>({
    url: [ 'auth', 'signout', ],
    success(res) {
      console.log(res);

      toast.success(res.message, {
        style: getToastStyle('success'),
      });

      // 캐시 스토어 클리어
      cacheStore.clear();

      // Pinia 세션도 정리하여 UI 즉시 반영 (내부에서 캐시 무효화도 처리)
      authStore.signout();

      router.push('/');
    },
    error(res) {
      console.log(res);

      toast.error(res.message, {
        style: getToastStyle('error'),
      });
    },
  });
}
