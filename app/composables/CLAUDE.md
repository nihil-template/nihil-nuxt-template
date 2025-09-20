# CLAUDE.md - Composables

이 파일은 `/app/composables/` 디렉토리의 컴포저블 작성 및 관리 가이드라인을 제공합니다.

## 디렉토리 구조

```
app/composables/
├── admin/              # 관리자 기능 관련 컴포저블
├── auth/               # 인증/인가 관련 컴포저블
├── common/             # 공통 유틸리티 컴포저블
│   └── api/           # API 관련 핵심 컴포저블
└── users/              # 사용자 관리 관련 컴포저블
```

## 네이밍 규칙

### 함수 네이밍

- **MUST**: `use` 접두사 사용 (Vue Composition API 규칙)
- **MUST**: camelCase 사용
- **MUST**: 동작 기반 네이밍: `use<Action><Target>` 형식
- **FORBIDDEN**: `handle` 접두사 사용 금지

**올바른 예시:**

```typescript
useSignIn()     // 로그인 처리
useGetUsers()   // 사용자 목록 조회
useUpdateProfile() // 프로필 업데이트
useDeleteUser() // 사용자 삭제
```

**잘못된 예시:**

```typescript
handleSignIn() // ❌
userSignIn()   // ❌
getUsers()     // ❌
```

### 파일 네이밍

- 파일명은 함수명과 동일하게 설정
- 예: `use + 함수명.ts` 형식

## API 컴포저블 패턴

### 1. 기본 API 컴포저블 (`/common/api/`)

#### useAPIGet.ts

- GET 요청 전용 컴포저블
- 캐시 기능 내장 (TTL 지원)
- 자동 토큰 리프레시 처리
- `useGet<TData>(options)` 래퍼 제공

#### useAPIMutation.ts

- POST/PUT/PATCH/DELETE 요청 전용
- `usePost<TBody, TData>(options)` 래퍼 제공
- `usePut<TBody, TData>(options)` 래퍼 제공
- `usePatch<TBody, TData>(options)` 래퍼 제공
- `useDelete<TBody, TData>(options)` 래퍼 제공

### 2. API 옵션 구조

```typescript
// GET 요청 옵션
{
  url: ['auth', 'signin'],           // URL 세그먼트
  params?: Record<string, any>,      // 쿼리 파라미터
  ttl?: number,                      // 캐시 TTL (분)
  immediate?: boolean,               // 즉시 실행 여부
  success?: (res, utils) => void,    // 성공 콜백
  error?: (res, utils) => void,      // 에러 콜백
}

// Mutation 요청 옵션
{
  url: ['users', 'profile'],         // URL 세그먼트
  body?: TBody,                      // 요청 본문
  freshTTL?: number,                 // 성공 시 캐시 TTL
  success?: (res, utils) => void,    // 성공 콜백
  error?: (res, utils) => void,      // 에러 콜백
}
```

## 엔터티별 컴포저블 패턴

### 구조 예시

```typescript
// use[Function].ts - 설명
export function use[Function]() {
  const router = useRouter();
  const toast = useToast();
  const authStore = useAuthStore();

  return usePost<SignInType, UserInfoType>({
    url: ["auth", "signin"],
    freshTTL: 60,
    success(res) {
      toast.add({ severity: "success", summary: res.message });
      authStore.cacheSession(res, 60);
      router.push("/");
    },
    error(res) {
      toast.add({ severity: "error", summary: res.message });
    },
  });
}
```

### 필수 포함 요소

1. **타입 안전성**: TypeScript 제네릭 활용
2. **토스트 알림**: PrimeVue useToast 사용
3. **스토어 연동**: 관련 Pinia 스토어와 연결
4. **에러 처리**: error 콜백에서 사용자 피드백 제공
5. **네비게이션**: 성공 시 적절한 페이지 이동

## 캐시 전략

### GET 요청 캐시

- `useCacheStore()`를 통한 메모리 캐시
- TTL 기반 만료 관리
- `force: true` 옵션으로 캐시 무시 가능

### 캐시 유틸리티 (CacheUtils)

```typescript
utils.touch(urlSegments, params, ttl); // 기존 캐시 TTL 연장
utils.replace(urlSegments, response, params, ttl); // 캐시 값 교체
utils.invalidate(urlSegments, params); // 특정 캐시 무효화
utils.remove(urlSegments, params); // 패턴 매칭 캐시 삭제
```

## 자동 토큰 리프레시

### 동작 방식

1. API 응답에서 `UNAUTHORIZED` 감지
2. `useRefreshToken()` 자동 호출
3. 성공 시 원본 요청 자동 재시도
4. 실패 시 로그아웃 처리 및 로그인 페이지 이동

### 적용 범위

- 모든 API 컴포저블에 자동 적용
- 별도 구현 불필요

## 새 컴포저블 추가 가이드

### 1. 파일 위치 결정

```
auth/     - 로그인, 회원가입, 비밀번호 관련
users/    - 사용자 CRUD, 프로필 관리
admin/    - 관리자 전용 기능
common/   - 도메인 무관한 유틸리티
```

### 2. 컴포저블 작성 템플릿

```typescript
import { useToast } from 'primevue/usetoast';
import { use[Domain]Store } from '~/entities/[domain]/[domain].store';
import type { [RequestType], [ResponseType] } from '@/schemas/[schema].schema';

export function use[Action][Target]() {
  const toast = useToast();
  const [domain]Store = use[Domain]Store();

  return use[Method]<[RequestType], [ResponseType]>({
    url: ['api', 'endpoint'],
    success(res) {
      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      // 스토어 업데이트
      [domain]Store.cache[Action](res);
    },
    error(res) {
      toast.add({
        severity: 'error',
        summary: res.message,
        life: 3000,
      });
    },
  });
}
```

### 3. 자동 임포트 확인

- Nuxt의 auto-import로 모든 컴포저블 자동 등록
- 명시적 import 구문 불필요
- 타입 추론 자동 지원

## 주의사항

### 스토어 연동

- 관련 도메인 스토어와 반드시 연동
- 성공 시 스토어 상태 업데이트 필수

### 에러 처리

- 모든 API 호출에 error 콜백 구현 필수
- 사용자 친화적 에러 메시지 제공

### 타입 안전성

- Zod 스키마와 연동된 TypeScript 타입 사용
- 제네릭을 통한 요청/응답 타입 명시

### 성능 최적화

- GET 요청은 적절한 TTL 설정으로 캐시 활용
- 불필요한 API 호출 방지
