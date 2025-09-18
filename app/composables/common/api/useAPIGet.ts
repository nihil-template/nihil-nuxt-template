// ~/composables/useGet.ts
import { defu } from 'defu';
import type { UseFetchOptions } from 'nuxt/app';
import { computed, nextTick, shallowRef, type MaybeRefOrGetter } from 'vue';

import { useCacheStore } from '~/entities/common/cache.store';

import type { CacheUtils } from './utils';
import { toQuery, buildURL, makeKey, resolveOptions, createCacheUtils, readFresh, setIfStale } from './utils';

import { config } from '@/config/config';
import type { ResponseType } from '@/schemas/response.schema';

/** 추가 옵션 */
type ExtraOptions<TData> = {
  /** URL 세그먼트: ['auth','signin'] | ['posts', 5] → '/auth/signin' | '/posts/5' */
  url: (string | number)[];
  /** 쿼리 파라미터 */
  params?: Record<string, string | number | boolean | null | undefined>;
  /** TTL(분). 0/미지정이면 캐시 안 함 */
  ttl?: number;
  /** 캐시 무시 강제 호출 */
  force?: boolean;
  /** baseURL (기본: '') */
  baseURL?: string;
  /** 캐시 키 커스터마이즈 */
  cacheKey?: string;
  /** 성공/실패 콜백 - Mutation과 동일한 구조 */
  success?: (res: ResponseType<TData>, utils: CacheUtils) => void | Promise<void>;
  error?: (res: ResponseType<TData>, utils: CacheUtils) => void | Promise<void>;
};

/** 사용자 옵션: fetch 옵션 + 확장 옵션 */
type UseGetOptions<TData>
  = Omit<UseFetchOptions<ResponseType<TData>>, 'method' | 'params'> & ExtraOptions<TData>;

export function useAPIGet<TData = unknown>(
  options: UseGetOptions<TData> | MaybeRefOrGetter<UseGetOptions<TData>>
) {
  // options가 ref/getter일 수도 있으므로 즉시 해석
  const _opts = resolveOptions(options);

  const {
    url: urlSegments,
    params,
    ttl = 0,
    force = false,
    baseURL = config.api.route,
    cacheKey,
    success,
    error,
    immediate = false,
    onResponse: userOnResponse,
    onResponseError: userOnResponseError,
    ...rest
  } = _opts;

  const url = buildURL(urlSegments, baseURL);
  const fullURL = url + toQuery(params);
  const key = cacheKey ?? makeKey('GET', url, params);

  const cacheStore = useCacheStore();
  const lastResponse = shallowRef<Response | undefined>(undefined);

  // 캐시 유틸리티 생성 (Mutation과 동일한 구조)
  const utils = createCacheUtils(baseURL, ttl);

  const merged = defu<UseFetchOptions<ResponseType<TData>>, UseFetchOptions<ResponseType<TData>>[]>(
    {
      method: 'GET',
      // 사용자 설정 또는 기본값 사용
      immediate,
      watch: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      // 쿠키 포함 설정
      credentials: 'include',
      // Nuxt 내장 캐시 비활성
      getCachedData: () => undefined,
      initialCache: false,
      // 응답 훅: 최근 Response 보관 + 사용자 훅 호출 유지
      onResponse(ctx) {
        lastResponse.value = ctx.response;
        if (typeof userOnResponse === 'function') {
          userOnResponse(ctx);
        }
      },
      onResponseError(ctx) {
        lastResponse.value = ctx.response;
        if (typeof userOnResponseError === 'function') {
          userOnResponseError(ctx);
        }
      },
    },
    rest
  );

  const f = useFetch<ResponseType<TData>>(fullURL, merged as any);

  // immediate가 true일 때 캐시 확인 및 콜백 실행 (단순화: getEntry 만료 체크에 위임)
  if (immediate) {
    const cached = readFresh<TData>(key);
    if (cached) {
      console.log('🔄 [Cache] 캐시에서 데이터 발견, useFetch에 설정:', cached);
      f.data.value = cached as ResponseType<TData>;
      nextTick(async () => {
        if (cached.error === true) await error?.(cached, utils);
        else await success?.(cached, utils);
      });
    }
  }

  // 편의 computed - useFetch 결과만 반환 (캐시는 별도 관리)
  const envelope = computed(() => f.data.value);

  const isError = computed(() => {
    const res = envelope.value;
    return res
      ? res.error === true
      : false;
  });
  const payload = computed<TData | null | undefined>(() => {
    const res = envelope.value;
    return res && !res.error
      ? res.data
      : null;
  });

  /** 캐시 무효화 */
  function invalidate() {
    // 스토어 캐시에서 삭제
    cacheStore.invalidate(key);
  }

  /** 수동 실행 + TTL 캐시 + 콜백 디스패치 */
  const trigger = async (newParams?: Record<string, string | number | boolean | null | undefined>) => {
    // 새로운 params가 제공되면 URL과 키를 업데이트
    if (newParams !== undefined) {
      const updatedParams = { ...params, ...newParams, };
      const updatedURL = url + toQuery(updatedParams);
      const updatedKey = cacheKey ?? makeKey('GET', url, updatedParams);

      // URL 업데이트를 위해 새로운 fetch 인스턴스 생성
      const updatedFetch = useFetch<ResponseType<TData>>(updatedURL, merged as any);

      // 캐시 조회 (새로운 키로) - force가 아니면 항상 캐시 우선 확인
      if (!force) {
        const cached = readFresh<TData>(updatedKey);
        if (cached) {
          console.log('🔄 [Cache] 캐시에서 데이터 발견, useFetch에 설정:', cached);
          updatedFetch.data.value = cached as ResponseType<TData>;
          if (cached.error === true) await error?.(cached, utils);
          else await success?.(cached, utils);
          return;
        }
      }

      // 원격 호출
      await updatedFetch.execute();
      const res = updatedFetch.data.value;
      if (!res) return;

      if (res.error !== true) {
        setIfStale(updatedKey, res, ttl);
      }
      if (res.error === true) await error?.(res, utils);
      else await success?.(res, utils);

      return;
    }

    // 기존 로직 (params 변경 없음) - force가 아니면 항상 캐시 우선 확인
    if (!force) {
      const cached = readFresh<TData>(key);
      if (cached) {
        console.log('🔄 [Cache] 캐시에서 데이터 발견, useFetch에 설정:', cached);
        f.data.value = cached as ResponseType<TData>;
        if (cached.error === true) await error?.(cached, utils);
        else await success?.(cached, utils);
        return;
      }
    }

    // 원격 호출
    await f.execute();
    const res = f.data.value;
    if (!res) return;

    if (res.error !== true) {
      setIfStale(key, res, ttl);
    }
    if (res.error === true) await error?.(res, utils);
    else await success?.(res, utils);
  };

  /** 에러면 throw, 성공이면 data 반환 */
  function unwrap(): TData {
    const res = f.data.value;
    if (!res) throw new Error('No response');
    if (res.error === true) throw new Error(res.message || 'Error');
    return res.data as TData;
  }

  return {
    ...f,
    trigger,
    unwrap,
    invalidate,
    remove: utils.remove,
    envelope,
    payload,
    isError,
    lastResponse,
    cacheKey: key,
    // 캐시 유틸리티 제공 (콜백 밖에서도 사용 가능)
    utils,
  };
}

// 편의 래퍼
export const useGet = <TData = unknown>(
  options: UseGetOptions<TData> | MaybeRefOrGetter<UseGetOptions<TData>>
) => useAPIGet<TData>(options);
