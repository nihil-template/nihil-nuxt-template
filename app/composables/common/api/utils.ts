// ~/composables/common/api/utils.ts
import type { MaybeRefOrGetter } from 'vue';

import { useAuthStore } from '~/entities/auth/auth.store';
import { useCacheStore } from '~/entities/common/cache.store';

import { RESPONSE_CODE } from '@/code/response.code';
import type { ResponseType } from '@/schemas/response.schema';

/** 쿼리 스트링 생성(키 정렬) */
export function toQuery(params?: Record<string, string | number | boolean | null | undefined>) {
  if (!params) return '';
  const entries = Object.entries(params)
    .filter(([ , v, ]) => v !== undefined && v !== null)
    .sort(([ a, ], [ b, ]) => a.localeCompare(b))
    .map(([ k, v, ]) => [ k, String(v), ] as const);
  const s = new URLSearchParams(entries as unknown as Record<string, string>).toString();
  return s
    ? `?${s}`
    : '';
}

/** URL 빌드: baseURL + / + segments(string|number) */
export function buildURL(segments: (string | number)[], baseURL = '') {
  const base = baseURL.replace(/\/+$/, '');
  const path = segments.map((s) => encodeURIComponent(String(s))).join('/');
  return `${base}/${path}`;
}

/** 캐시 키 생성 */
export function makeKey(method: string, url: string, params?: Record<string, any>) {
  return `${method}:${url}${toQuery(params)}`;
}

// useGetCache 제거 - Pinia 스토어 사용

/** 캐시 유틸리티 타입 */
export type CacheUtils = {
  /** 존재하는 엔트리의 신선도만 연장 */
  touch: (
    urlSegments: (string | number)[],
    params?: Record<string, any>,
    ttlMinutes?: number
  ) => void;
  /** 값을 교체하고 TTL 설정(없던 키도 생성) */
  replace: (
    urlSegments: (string | number)[],
    response: ResponseType<any>,
    params?: Record<string, any>,
    ttlMinutes?: number,
  ) => void;
  /** 캐시 무효화 */
  invalidate: (
    urlSegments: (string | number)[],
    params?: Record<string, any>
  ) => void;
  /** 패턴에 맞는 캐시들 모두 삭제 */
  remove: (
    urlSegments: (string | number)[],
    params?: Record<string, any>
  ) => void;
  /** 내부 키 계산기(디버그 용) */
  makeKey: (
    urlSegments: (string | number)[],
    params?: Record<string, any>
  ) => string;
};

/** 캐시 유틸리티 생성 */
export function createCacheUtils(baseURL: string, freshTTL: number | undefined): CacheUtils {
  const cacheStore = useCacheStore();

  const touch: CacheUtils['touch'] = (urlSegments, params, ttlMinutes) => {
    const url = buildURL(urlSegments, baseURL);
    const key = makeKey('GET', url, params);
    const hit = cacheStore.get(key);
    if (!hit) return;
    const ttl = (ttlMinutes ?? freshTTL ?? 0);
    if (ttl > 0) {
      // responseTime이 없으면 현재 시간으로 설정
      const responseWithTime = {
        ...hit,
        responseTime: hit.responseTime || new Date().toISOString(),
      };
      cacheStore.set(key, responseWithTime, ttl);
    }
  };

  const replace: CacheUtils['replace'] = (urlSegments, response, params, ttlMinutes) => {
    const url = buildURL(urlSegments, baseURL);
    const key = makeKey('GET', url, params);
    const ttl = (ttlMinutes ?? freshTTL ?? 0);

    // 스토어 캐시에만 저장 (유효 캐시가 있으면 유지)
    setIfStaleInternal(key, response, ttl);
  };

  const invalidate: CacheUtils['invalidate'] = (urlSegments, params) => {
    const url = buildURL(urlSegments, baseURL);
    const key = makeKey('GET', url, params);

    // 스토어 캐시에서 삭제
    cacheStore.invalidate(key);
  };

  const remove: CacheUtils['remove'] = (urlSegments, params) => {
    // 스토어 캐시에서 패턴 매칭 삭제
    cacheStore.remove(urlSegments, params);
  };

  const keyOf: CacheUtils['makeKey'] = (urlSegments, params) => makeKey('GET', buildURL(urlSegments, baseURL), params);

  return { touch, replace, invalidate, remove, makeKey: keyOf, };
}

/** 옵션이 ref/getter일 수도 있으므로 즉시 해석하는 헬퍼 */
export function resolveOptions<T>(options: T | MaybeRefOrGetter<T>): T {
  return typeof options === 'function'
    ? (options as () => T)()
    : (options as T);
}

/** 내부/외부에서 재사용하기 위한 공통 헬퍼들 */
export function getEntry(keyOrSegments: string | (string | number)[], params?: Record<string, any>) {
  const cacheStore = useCacheStore();
  const key = typeof keyOrSegments === 'string'
    ? keyOrSegments
    : makeKey('GET', buildURL(keyOrSegments, ''), params);
  return cacheStore.getEntry(key);
}

export function readFresh<T = unknown>(keyOrSegments: string | (string | number)[], params?: Record<string, any>): ResponseType<T> | undefined {
  const cacheStore = useCacheStore();
  const key = typeof keyOrSegments === 'string'
    ? keyOrSegments
    : makeKey('GET', buildURL(keyOrSegments, ''), params);
  const entry = cacheStore.getEntry(key);
  return entry?.value as ResponseType<T> | undefined;
}

export function setIfStale<T = unknown>(keyOrSegments: string | (string | number)[], value: ResponseType<T>, ttlMinutes: number, params?: Record<string, any>) {
  const key = typeof keyOrSegments === 'string'
    ? keyOrSegments
    : makeKey('GET', buildURL(keyOrSegments, ''), params);
  setIfStaleInternal(key, value, ttlMinutes);
}

// 실제 쓰기 수행(키는 문자열 형태)
function setIfStaleInternal<T = unknown>(key: string, value: ResponseType<T>, ttlMinutes: number) {
  const cacheStore = useCacheStore();
  if (!ttlMinutes || ttlMinutes <= 0) return;
  const existingEntry = cacheStore.getEntry(key);
  if (existingEntry && Date.now() < existingEntry.expiresAt) {
    console.log('🔄 [Cache] 기존 캐시가 유효하므로 덮어쓰지 않음:', key);
    return;
  }
  cacheStore.set(key, value, ttlMinutes);
}

/** 토큰 리프레시가 필요한지 확인 */
export function shouldRefreshToken(response: ResponseType<any>): boolean {
  return response.error === true && response.code === RESPONSE_CODE.UNAUTHORIZED;
}

/** 자동 토큰 리프레시 처리 */
export async function onAutoRefresh(
  retryCallback?: () => Promise<void>
): Promise<boolean> {
  console.log('🔄 [Auth] UNAUTHORIZED 감지, 토큰 리프레시 시도');

  try {
    // useRefreshToken은 auto-import되므로 직접 사용 가능
    const { mutate, } = useRefreshToken();

    // 토큰 재발급 시도
    await mutate();

    console.log('✅ [Auth] 토큰 리프레시 성공, 원본 요청 재시도');

    // 원본 요청 재시도 (옵션)
    if (retryCallback) {
      await retryCallback();
    }

    return true;
  }
  catch (error) {
    console.error('❌ [Auth] 토큰 리프레시 실패:', error);

    // 리프레시 실패 시 로그아웃 처리
    const { signout, } = useAuthStore();
    signout();

    // 로그인 페이지로 리다이렉트
    await navigateTo('/auth/signin');

    return false;
  }
}
