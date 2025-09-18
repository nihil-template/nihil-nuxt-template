import { ref, computed } from 'vue';

// useCacheStore는 createCacheUtils에서 사용됨

import type { CacheUtils } from './utils';
import { buildURL, createCacheUtils } from './utils';

import { config } from '@/config/config';
import type { ResponseType } from '@/schemas/response.schema';

type Method = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type MutationOptions<TBody, TData> = {
  /** URL 세그먼트: ['auth','signin'] | ['posts', 5] → '/auth/signin' | '/posts/5' */
  url: (string | number)[];
  method: Method;
  /** 쿼리 파라미터 */
  params?: Record<string, string | number | boolean | null | undefined>;
  /** 요청 본문 */
  body?: TBody;
  /** baseURL (기본: '') */
  baseURL?: string;
  /** HTTP 헤더 */
  headers?: Record<string, string>;
  /** 기본 TTL(분) – utils 호출에서 개별 override 가능 */
  freshTTL?: number;
  /** 성공 콜백 - 캐시 utils를 넘깁니다 */
  success?: (res: ResponseType<TData>, utils: CacheUtils) => void | Promise<void>;
  /** 에러 콜백 - 캐시 utils를 넘깁니다 */
  error?: (res: ResponseType<TData>, utils: CacheUtils) => void | Promise<void>;
};

export function useAPIMutation<TBody = unknown, TData = unknown>(opts: MutationOptions<TBody, TData>) {
  const { url: urlSegments, params, method, baseURL = config.api.route, headers, freshTTL, success, error, } = opts;
  const pending = ref(false);
  const response = ref<ResponseType<TData> | null>(null);
  const isError = computed(() => {
    const res = response.value;
    return res
      ? res.error === true
      : false;
  });

  const utils = createCacheUtils(baseURL, freshTTL);

  async function mutate(bodyData?: TBody) {
    pending.value = true;
    try {
      const fullURL = buildURL(urlSegments, baseURL);
      // $fetch는 ofetch 기반으로, 서버/클라이언트 모두에서 동작합니다.
      const res = await $fetch<ResponseType<TData>>(fullURL, {
        method,
        params,
        body: (bodyData ?? opts.body) as any,
        headers,
        credentials: 'include', // 쿠키 포함
      });
      response.value = res;

      if (res.error === true) await error?.(res, utils);
      else await success?.(res, utils);
    }
    catch (e: any) {
      const fallback: ResponseType<TData> = {
        error: true,
        message: e?.message ?? 'Network error',
        code: 'NETWORK_ERROR',
        data: null as any,
      };
      response.value = fallback;
      await error?.(fallback, utils);
    }
    finally {
      pending.value = false;
    }
  }

  return {
    mutate,
    pending,
    response,
    isError,
    invalidate: utils.invalidate,
    remove: utils.remove,
    // 캐시 유틸리티 제공 (콜백 밖에서도 사용 가능)
    utils,
  };
}

// 편의 래퍼
export const usePost = <TBody = unknown, TData = unknown>(
  options: Omit<MutationOptions<TBody, TData>, 'method'>
) => useAPIMutation<TBody, TData>({
  ...options,
  method: 'POST',
});

export const usePut = <TBody = unknown, TData = unknown>(
  options: Omit<MutationOptions<TBody, TData>, 'method'>
) => useAPIMutation<TBody, TData>({
  ...options,
  method: 'PUT',
});

export const usePatch = <TBody = unknown, TData = unknown>(
  options: Omit<MutationOptions<TBody, TData>, 'method'>
) => useAPIMutation<TBody, TData>({
  ...options,
  method: 'PATCH',
});

export const useDelete = <TBody = unknown, TData = unknown>(
  options: Omit<MutationOptions<TBody, TData>, 'method'>
) => useAPIMutation<TBody, TData>({
  ...options,
  method: 'DELETE',
});
