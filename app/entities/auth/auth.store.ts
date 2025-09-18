import { useCacheStore } from '~/entities/common/cache.store';

import type { ResponseType } from '@/schemas/response.schema';
import type { UserInfoType } from '@/schemas/user.schema';

export const useAuthStore = defineStore('auth', () => {
  const cacheStore = useCacheStore();
  const session = ref<UserInfoType | null>(null);
  const isRestored = ref(false);

  // 세션 정보 설정 (로그인 성공 시)
  function signin(response: ResponseType<UserInfoType>) {
    session.value = response.data;

    // 세션 정보를 캐시에 저장 (60분)
    cacheStore.replace(
      [ 'auth', 'session', ],
      response,
      60
    );
  }

  // 로그아웃 처리
  function signout() {
    session.value = null;

    // 세션 캐시 무효화
    cacheStore.invalidate([ 'auth', 'session', ]);

    // 인증 관련 모든 캐시 제거
    cacheStore.remove([ 'auth', ]);
  }

  // 회원탈퇴 후 자동 로그아웃
  function withdraw() {
    signout();
  }

  // 세션 정보 업데이트 (프로필 수정 등)
  function updateSession(updatedInfo: Partial<UserInfoType> | ResponseType<UserInfoType>) {
    // ResponseType인지 부분 업데이트 객체인지 확인
    const isServerResponse = 'error' in updatedInfo && 'message' in updatedInfo && 'code' in updatedInfo;

    if (isServerResponse) {
      // 서버 응답인 경우: 전체 응답을 그대로 사용
      const serverResponse = updatedInfo as ResponseType<UserInfoType>;
      session.value = serverResponse.data;

      // 기존 캐시에서 responseTime 조회
      const existingCache = cacheStore.get([ 'auth', 'session', ], {});

      // 서버 응답의 모든 정보 사용하되, responseTime만 기존 것 보존
      const cacheResponse: ResponseType<UserInfoType> = {
        error: serverResponse.error,
        message: serverResponse.message,
        code: serverResponse.code,
        data: serverResponse.data,
        responseTime: existingCache?.responseTime || serverResponse.responseTime || new Date().toISOString(),
      };

      cacheStore.replace(
        [ 'auth', 'session', ],
        cacheResponse,
        60
      );
    }
    else {
      // 부분 업데이트인 경우: 기존 로직 유지
      if (session.value) {
        session.value = { ...session.value, ...updatedInfo as Partial<UserInfoType>, };

        // 캐시에서 기존 엔트리 조회
        const existingCache = cacheStore.get([ 'auth', 'session', ], {});

        if (existingCache && !existingCache.error) {
          // 기존 responseTime 유지하면서 데이터만 업데이트
          const updateResponse: ResponseType<UserInfoType> = {
            error: false,
            message: '세션 정보가 업데이트되었습니다.',
            code: 'SUCCESS',
            data: session.value,
            responseTime: existingCache.responseTime, // 기존 시간 유지!
          };

          cacheStore.replace([ 'auth', 'session', ], updateResponse, 60);
        }
        else {
          // 캐시가 없으면 새로 생성
          const newResponse: ResponseType<UserInfoType> = {
            error: false,
            message: '세션 정보가 업데이트되었습니다.',
            code: 'SUCCESS',
            data: session.value,
            responseTime: new Date().toISOString(),
          };

          cacheStore.replace([ 'auth', 'session', ], newResponse, 60);
        }
      }
    }
  }

  // 세션 만료 처리
  function expireSession() {
    session.value = null;
    cacheStore.invalidate([ 'auth', 'session', ]);
  }

  // 캐시에서 세션 복원 (앱 시작 시)
  function restoreSession() {
    // 이미 복원했으면 중복 실행 방지
    if (isRestored.value) {
      console.log('🔄 [Auth] 이미 복원됨, 중복 실행 방지');
      return;
    }

    console.log('🔄 [Auth] restoreSession 호출됨');
    console.log('🔄 [Auth] 현재 세션 상태:', session.value);

    // useGetSession과 동일한 캐시 키 생성
    const cached = cacheStore.get([ 'auth', 'session', ], {});
    console.log('🔄 [Auth] 캐시에서 조회한 데이터:', cached);

    if (cached && !cached.error) {
      session.value = cached.data;
      console.log('🔄 [Auth] 캐시에서 세션 복원 성공:', cached.data);
    }
    else {
      console.log('❌ [Auth] 캐시에서 세션을 찾을 수 없음');
    }

    isRestored.value = true;
  }

  // 세션 조회 결과 캐시
  function cacheSession(response: ResponseType<UserInfoType>, ttlMinutes = 60) {
    session.value = response.data;

    cacheStore.replace(
      [ 'auth', 'session', ],
      response,
      ttlMinutes
    );
  }

  // 토큰 재발급 후 세션 업데이트
  function refreshSession(response: ResponseType<UserInfoType>) {
    session.value = response.data;

    cacheStore.replace(
      [ 'auth', 'session', ],
      response,
      60
    );
  }

  return {
    // 상태
    session,

    // 액션 (훅 이름과 매칭)
    signin,
    signout,
    withdraw,
    updateSession,
    expireSession,
    restoreSession,
    cacheSession,
    refreshSession,
  };
}, {
  persist: {
    key: 'auth-store',
    storage: typeof window !== 'undefined'
      ? localStorage
      : undefined,
    pick: [ 'session', ],
  },
});
