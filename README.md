# Nuxt 4 사용자 인증 템플릿

Nuxt 4 + TypeScript 기반의 실제 운영 가능한 인증/관리 템플릿입니다. 인증 전반, 사용자/관리자 기능, 캐시 일관성, 폼 검증까지 즉시 사용할 수 있는 구조를 제공합니다.

## 요약

- **인증 전 과정**: 회원가입/로그인/로그아웃, 비밀번호 찾기/재설정, 토큰 자동 재발급, 세션 TTL 관리(기본 60분)
- **사용자 기능**: 프로필 조회/수정, 비밀번호 변경, 회원탈퇴, 사용자 목록/상세
- **관리자 기능**: 관리자 회원가입, 대시보드, 사용자 관리
- **아키텍처**: 컴포저블 훅 + Pinia 엔티티 스토어 + TTL 캐시 스토어(Pinia persist)
- **검증**: Zod 스키마 + vee-validate 폼 바인딩 (타입 안전)

## 기술 스택

- **프레임워크**: Nuxt 4, Vue 3.5
- **언어**: TypeScript
- **상태 관리**: Pinia, pinia-plugin-persistedstate
- **UI**: PrimeVue(Lara 테마), TailwindCSS, clsx/tailwind-merge 유틸(`cn`)
- **HTTP**: ofetch(`$fetch`), Axios 유틸(옵션)
- **검증**: Zod, vee-validate(+@vee-validate/zod)

## 실행

```bash
pnpm i
pnpm dev
```

환경 설정은 `app/config/config.ts`를 단일 소스로 사용합니다. API 라우트 기본값은 `http://localhost:8000`입니다.

## 디렉터리 구조

```
app/
├── pages/            # 라우트 페이지 ((auth)/(users)/(profile)/(admin))
├── components/       # 화면 컴포넌트 (auth/users/profile/admin)
├── composables/      # 도메인/공용 훅 (auth/users/common)
├── entities/         # Pinia 스토어 (auth/users/common(cache))
├── schemas/          # Zod 스키마 및 타입 추출
├── plugins/          # $api, 캐시 초기화 등 Nuxt 플러그인
├── middleware/       # 전역 인증 미들웨어
├── libs/             # 유틸리티 (예: `cn`, axios tools)
└── config/           # 사이트/이미지/API 엔드포인트 설정
```

## 핵심 개념

- **단일 진실 소스(Single Source of Truth)**: 세션은 `useAuthStore`가 보유하고, API GET 응답은 `useCacheStore`에 TTL과 함께 저장합니다.
- **자동 토큰 재발급**: API 응답 코드를 해석하여 `UNAUTHORIZED` 시 `useRefreshToken`을 통해 자동 재시도합니다.
- **캐시 일관성**: 리스트/상세/프로필 등 관련 키들을 스토어 유틸로 무효화/갱신하여 화면 일관성을 유지합니다.

## 플러그인/미들웨어

- `app/plugins/api.ts`: `$api` 인스턴스 제공(`baseURL=config.api.route`, `credentials: 'include'`).
- `app/plugins/cache.client.ts`: 클라이언트 진입 시 만료 캐시 정리.
- `app/middleware/auth.global.ts`: 공개 경로를 제외하고 세션 없으면 `/auth/signin`으로 리다이렉트.

## 캐시/스토어 레이어

- `entities/common/cache.store.ts`
  - 문자열 키 기반 TTL 캐시. `get/getEntry/set/replace/invalidate/remove/touch/clear` 제공.
  - `persist`로 로컬 스토리지 보존, 복원 시 만료 항목 필터링.
- `entities/auth/auth.store.ts`
  - `session` 상태와 `signin/signout/restoreSession/cacheSession/refreshSession/updateSession/withdraw` 액션 제공.
  - 세션 캐시는 항상 `[ 'auth','session' ]` 키를 사용.
- `entities/users/users.store.ts`
  - 프로필 수정/생성/삭제 후 관련 리스트·상세 키 무효화 및 캐시 갱신 유틸 제공.

## 공용 API 훅

- `composables/common/api/useAPIGet.ts` → `useGet`
  - 옵션: `url`, `params`, `ttl`, `force`, `baseURL`, `cacheKey`, `immediate`, `success/error`.
  - 동작: 캐시 신선도 검사 → 신선하면 즉시 반환/콜백, 아니라면 원격 호출 후 `setIfStale`로 TTL 캐시 저장.
  - 자동 토큰 리프레시(401 등) 시 `useRefreshToken`으로 재시도.
- `composables/common/api/useAPIMutation.ts` → `usePost/usePut/usePatch/useDelete`
  - 모든 요청은 `credentials: 'include'`로 쿠키 기반 세션.
  - `success/error` 콜백에 캐시 유틸(`touch/replace/invalidate/remove`) 주입.
- `composables/common/api/utils.ts`
  - `buildURL/makeKey/toQuery`, 캐시 유틸 생성, `readFresh/setIfStale`, `onAutoRefresh` 등.

## 인증 도메인 컴포저블

- `useSignUp`, `useSignIn`, `useSignOut`, `useForgotPassword`, `useResetPassword`, `useChangePassword`, `useWithdraw`, `useRefreshToken`, `useGetSession`
  - 성공 시 PrimeVue `Toast` 사용, 세션은 `auth.store`를 통해 일관 갱신.
  - `useGetSession`은 클라이언트 진입 시 캐시 만료 여부를 체크하고 필요한 경우에만 원격 호출.

## 사용자 도메인 컴포저블

- `useGetUsers(params?)` 리스트 + 총계
- `useGetUserByNo(userNo)` 상세
- `useGetUserByEmail(emlAddr)` 상세(by email)
- `useUpdateProfile()` 자기 프로필 수정 → `users.store.updateProfile`로 관련 캐시 무효화/세션 갱신

## 스키마/타입

- `schemas/user.schema.ts`
  - 강력한 비밀번호 규칙, `createUserSchema/signInSchema/...` 등 폼 스키마 제공.
  - `export type`으로 `UserInfoType/CreateUserType/...` 제공.
- `schemas/response.schema.ts`
  - 공통 응답 래퍼 `ResponseType`, 목록 응답 `ListResponseType`.

## UI/컴포넌트 예시

- 인증: `components/auth/SignInForm.vue`, `SignUpForm.vue`, `ForgotPasswordForm.vue`, `ResetPasswordForm.vue`
- 프로필: `ProfilePage.vue`, `ProfileEditForm.vue`, `ChangePasswordForm.vue`, `WithdrawForm.vue`
- 사용자: `UserList.vue`, `UserDetail.vue`
- 관리자: `AdminDashboard.vue`, `NewAdminForm.vue`

## 메타데이터 헬퍼

- `composables/common/useSetMeta.ts`로 SEO/OG/Twitter 메타 일괄 설정. 각 페이지에서 간단히 호출:

```ts
useSetMeta({ title: "로그인", url: "/auth/signin" });
```

## 라우팅/레이아웃

- 레이아웃: `layouts/default.vue`, `auth-layout.vue`, `users-layout.vue`, `admin-layout.vue`
- 페이지 예: `pages/(auth)/auth/signin.vue` → `<SignInForm />`

## 설정

- `config/config.ts`에서 사이트/이미지/Google/`api.route`를 관리합니다.
- `nuxt.config.ts`
  - `@pinia/nuxt`, `pinia-plugin-persistedstate`, `@primevue/nuxt-module`, `@vee-validate/nuxt` 사용
  - `imports.dirs`에 `composables/**`, `entities/*/*.store`를 등록해 전역 auto-import

## Axios 유틸(선택)

- `app/libs/tools/axios.tools.ts`는 `$fetch` 대안이 필요할 때 사용할 수 있는 래퍼입니다.

## 개발 명령어

```bash
pnpm dev          # 개발 서버 (기본 3000)
pnpm build        # 프로덕션 빌드
pnpm lint         # ESLint
pnpm check-types  # 타입 점검
```

## 확장 가이드

1. 스키마 추가 → 2) 컴포저블 생성 → 3) 스토어/캐시 키 전략 정의 → 4) 페이지/컴포넌트 연결.

예: products 도메인

```
app/
├── pages/(products)/products/
├── components/products/
├── composables/products/
├── entities/products/
└── schemas/products.schema.ts
```

이 템플릿은 쿠키 기반 세션(서버 신뢰)과 TTL 캐시를 결합하여, 보안성과 성능을 모두 고려한 기본기를 제공합니다.
