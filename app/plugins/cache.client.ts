import { defineNuxtPlugin } from 'nuxt/app';

import { useCacheStore } from '~/entities/common/cache.store';

export default defineNuxtPlugin(() => {
  // 클라이언트에서만 실행
  if (import.meta.client) {
    // 캐시 스토어 초기화 (만료된 캐시 정리)
    const { initializeCache, } = useCacheStore();
    initializeCache();
  }
});
