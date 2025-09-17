import { config } from '@/config/config';
import type { ResponseType } from '@/schemas/response.schema';
import { DateTime } from 'luxon';

import { buildURL, makeKey } from '~/composables/common/api/utils';

/** 캐시 엔트리 */
export type CacheEntry<T = any> = {
  expiresAt: number;
  createdAt: number; // 캐시 생성 시간 추가
  responseTime: string; // 서버 응답 시간 (ISO 8601)
  value: ResponseType<T>;
};

export const useCacheStore = defineStore('cache', () => {
  const cache = ref<Record<string, CacheEntry>>({});

  /** 캐시 조회 */
  function get(urlSegments: (string | number)[] | string, params?: Record<string, any>) {
    const key = typeof urlSegments === 'string'
      ? urlSegments
      : makeKey('GET', buildURL(urlSegments, config.api.route), params);

    const entry = cache.value[key];
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      delete cache.value[key];
      return undefined;
    }

    return entry.value;
  }

  /** 캐시 엔트리 조회 (만료시간 포함) */
  function getEntry(urlSegments: (string | number)[] | string, params?: Record<string, any>) {
    const key = typeof urlSegments === 'string'
      ? urlSegments
      : makeKey('GET', buildURL(urlSegments, config.api.route), params);

    const entry = cache.value[key];
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      delete cache.value[key];
      return undefined;
    }

    return entry;
  }

  /** 캐시 저장 */
  function set(urlSegments: (string | number)[] | string, value: ResponseType<any>, ttlMinutes: number, params?: Record<string, any>) {
    if (ttlMinutes <= 0) return;

    const key = typeof urlSegments === 'string'
      ? urlSegments
      : makeKey('GET', buildURL(urlSegments, config.api.route), params);

    // responseTime이 있으면 그것을 기준으로 만료 시간 계산
    let expiresAt: number;
    let createdAt: number;
    let responseTime: string;

    if (value.responseTime) {
      // 서버 응답 시간을 기준으로 계산
      const responseDateTime = DateTime.fromISO(value.responseTime);
      if (responseDateTime.isValid) {
        responseTime = value.responseTime;
        createdAt = responseDateTime.toMillis();
        expiresAt = responseDateTime.plus({ minutes: ttlMinutes, }).toMillis();
      }
      else {
        // responseTime이 유효하지 않으면 현재 시간 사용
        const now = DateTime.now();
        responseTime = now.toISO();
        createdAt = now.toMillis();
        expiresAt = now.plus({ minutes: ttlMinutes, }).toMillis();
      }
    }
    else {
      // responseTime이 없으면 현재 시간 사용
      const now = DateTime.now();
      responseTime = now.toISO();
      createdAt = now.toMillis();
      expiresAt = now.plus({ minutes: ttlMinutes, }).toMillis();
    }

    cache.value[key] = {
      expiresAt,
      createdAt,
      responseTime,
      value,
    };
  }

  /** 특정 캐시 엔트리 삭제 - 배열 또는 문자열 키 지원 */
  function invalidate(urlSegments: (string | number)[] | string, params?: Record<string, any>) {
    const key = typeof urlSegments === 'string'
      ? urlSegments
      : makeKey('GET', buildURL(urlSegments, config.api.route), params);

    delete cache.value[key];
  }

  /** 패턴에 맞는 캐시들 모두 삭제 - 배열 또는 문자열 패턴 지원 */
  function remove(urlSegments: (string | number)[] | string, params?: Record<string, any>) {
    const pattern = typeof urlSegments === 'string'
      ? urlSegments
      : makeKey('GET', buildURL(urlSegments, config.api.route), params);

    Object.keys(cache.value).forEach((key) => {
      if (key.startsWith(pattern)) {
        delete cache.value[key];
      }
    });
  }

  /** 캐시 TTL 연장 (존재하는 엔트리만) - 배열 또는 문자열 키 지원 */
  function touch(urlSegments: (string | number)[] | string, ttlMinutes: number, params?: Record<string, any>) {
    const key = typeof urlSegments === 'string'
      ? urlSegments
      : makeKey('GET', buildURL(urlSegments, config.api.route), params);

    const entry = cache.value[key];
    if (entry && ttlMinutes > 0) {
      entry.expiresAt = Date.now() + ttlMinutes * 60 * 1000;
    }
  }

  /** 캐시에 새 데이터 교체 저장 - 배열 또는 문자열 키 지원 */
  function replace(urlSegments: (string | number)[] | string, response: ResponseType<any>, ttlMinutes: number, params?: Record<string, any>) {
    const key = typeof urlSegments === 'string'
      ? urlSegments
      : makeKey('GET', buildURL(urlSegments, config.api.route), params);

    // 기존 캐시가 있고 아직 만료되지 않았으면 덮어쓰지 않음
    const existingEntry = cache.value[key];
    if (existingEntry && Date.now() < existingEntry.expiresAt) {
      console.log('🔄 [Cache] 기존 캐시가 유효하므로 덮어쓰지 않음:', key);
      return;
    }

    // 캐시에는 data만 저장하되, responseTime은 그대로 유지
    const cacheValue: ResponseType<any> = {
      error: response.error,
      message: response.message,
      code: response.code,
      data: response.data,
      responseTime: response.responseTime,
    };

    set(key, cacheValue, ttlMinutes);
  }

  /** 캐시 전체 초기화 */
  function clear() {
    cache.value = {};
  }

  /** 만료된 캐시들 정리 */
  function cleanup() {
    const now = Date.now();
    Object.keys(cache.value).forEach((key) => {
      if (cache.value[key] && cache.value[key].expiresAt <= now) {
        delete cache.value[key];
      }
    });
  }

  /** 스토어 초기화 시 만료된 캐시 정리 */
  function initializeCache() {
    cleanup();
  }

  return {
    cache,
    get,
    getEntry,
    set,
    invalidate,
    remove,
    touch,
    replace,
    clear,
    cleanup,
    initializeCache,
  };
}, {
  persist: {
    key: 'api-cache',
    storage: typeof window !== 'undefined'
      ? localStorage
      : undefined,
    pick: [ 'cache', ],
    debug: typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV,
    // 만료된 캐시 필터링을 위한 커스텀 직렬화
    serializer: {
    // 스토어의 state(여기서는 { cache, ... })를 문자열로 직렬화
      serialize: (state: any) => {
      // SSR(또는 window 미존재) 환경에서는 빈 객체 문자열 반환
        if (typeof window === 'undefined') return '{}';

        const now = Date.now();

        // state.cache가 없을 수도 있으므로 기본값 {}
        const source: Record<string, CacheEntry> = state?.cache ?? {};
        const filtered: Record<string, CacheEntry> = {};

        // 만료되지 않은 항목만 선별
        for (const k of Object.keys(source)) {
          const e = source[k];
          if (e && typeof e.expiresAt === 'number' && e.expiresAt > now) {
            filtered[k] = e;
          }
        }

        // 역직렬화 시에도 동일한 모양으로 복원할 수 있도록 { cache: ... } 형태 유지
        return JSON.stringify({ cache: filtered, });
      },

      // localStorage에 저장된 문자열을 state 형태로 복원
      deserialize: (str: string) => {
      // SSR(또는 window 미존재) 환경에서는 초기 상태 반환
        if (typeof window === 'undefined') return { cache: {}, };

        try {
          const parsed = JSON.parse(str) ?? {};
          const now = Date.now();

          // 저장된 형태가 { cache: {...} } 이므로 동일하게 접근
          const src: Record<string, CacheEntry> = parsed?.cache ?? {};
          const filtered: Record<string, CacheEntry> = {};

          // 복원 시점에도 만료된 항목은 버림
          for (const k of Object.keys(src)) {
            const e = src[k];
            if (e && typeof e.expiresAt === 'number' && e.expiresAt > now) {
              filtered[k] = e;
            }
          }

          return { cache: filtered, };
        }
        catch {
        // 손상/비정상 데이터는 안전하게 초기 상태로 대체
          return { cache: {}, };
        }
      },
    },

  },
});
