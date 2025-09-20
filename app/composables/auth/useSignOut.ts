import { useToast } from 'primevue/usetoast';

import { useAuthStore } from '~/entities/auth/auth.store';
import { useCacheStore } from '~/entities/common/cache.store';

export function useSignOut() {
  const toast = useToast();
  const router = useRouter();
  const cacheStore = useCacheStore();
  const authStore = useAuthStore();

  return usePost<null, null>({
    url: [ 'auth', 'signout', ],
    success(res) {
      console.log(res);

      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      // 캐시 스토어 클리어
      cacheStore.clear();

      // Pinia 세션도 정리하여 UI 즉시 반영 (내부에서 캐시 무효화도 처리)
      authStore.signout();

      router.push('/');
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
