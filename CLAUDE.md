# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 제공되는 가이드라인입니다.

## 🚨 중요: 이 프로젝트는 개발 템플릿입니다

**이 프로젝트는 Nuxt 4 기반의 개발 템플릿으로**, 새로운 프로젝트를 시작할 때 사용할 수 있는 보일러플레이트입니다. 템플릿의 특성상 다음과 같은 주의사항이 있습니다:

### 템플릿 사용 시 주의사항

1. **API 엔드포인트 미구현**: 백엔드 API가 구현되어 있지 않으므로, 실제 사용 시 백엔드 API를 별도로 구현해야 합니다.
2. **샘플 데이터**: 현재 포함된 데이터는 모두 예시 데이터이며, 실제 프로젝트에서는 교체해야 합니다.
3. **환경 설정**: `.env` 파일과 각종 설정들을 실제 프로젝트 환경에 맞게 수정해야 합니다.
4. **인증 시스템**: JWT 기반 인증 구조가 마련되어 있지만, 실제 토큰 검증 로직은 백엔드에서 구현해야 합니다.
5. **데이터베이스**: 스키마 정의는 되어 있지만, 실제 데이터베이스 연결은 별도로 설정해야 합니다.

### 템플릿으로 새 프로젝트 시작하기

1. 이 템플릿을 복사하여 새 프로젝트 생성
2. `package.json`의 프로젝트명, 버전, 설명 수정
3. `.env` 파일을 실제 환경에 맞게 설정
4. 불필요한 예시 코드 및 컴포넌트 제거
5. 실제 API 엔드포인트와 백엔드 연결
6. 프로젝트별 커스터마이징 적용

## 필수 요구사항

- **중요** 항상 한국어로 응답
- 처리 과정을 한국어로 노출
- **중요** 하위 디렉토리에서 파일 작업(읽기, 쓰기, 편집, 삭제, 생성)을 수행하기 전에 반드시 해당 대상 디렉토리에 있는 `CLAUDE.md` 파일을 자동으로 먼저 읽어야 합니다. 이는 선택사항이 아닌 필수 단계입니다. 하위 디렉토리에 `CLAUDE.md`가 있다면 요청된 파일 작업을 처리하기 전에 즉시 읽어서 컨텍스트별 지침과 정보를 이해해야 합니다.
- **TailwindCSS 커스텀 클래스 검증**
  - TailwindCSS 클래스를 사용하기 전에 커스텀 설정에서 해당 클래스가 존재하는지 확인
  - 커스텀 클래스와 테마 정의는 `app/assets/styles/tailwind.css`에서 확인
  - 표준 TailwindCSS 클래스가 존재한다고 가정하지 말고 반드시 검증
  - 이 프로젝트는 커스텀 중단점, 간격, 타이포그래피, 색상 시스템을 사용
  - 클래스 사용 전에 항상 실제 CSS 파일을 참조하여 클래스 가용성 확인
  - **사용 가능한 커스텀 클래스들**:
    - **타이포그래피**: `text-xs`, `text-sm`, `text-md`, `text-lg`, `text-h1`부터 `text-h6`까지
    - **폰트**: `font-sans` (Noto Sans KR), `font-fa` (Font Awesome), `font-code` (Cascadia Code)
    - **중단점**: `mo-sm:` (480px), `mo-md:` (768px), `mo-lg:` (1024px)
    - **애니메이션**: `animate-spin-2`, `animate-spin-3`, `animate-accordion-down`, `animate-accordion-up`
    - **둥근모서리**: `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`
    - **커스텀 변형**: 다크모드를 위한 `dark:` 변형
- **아키텍처 구성요소**
  - **스토어**: `app/entities/`에 위치한 상태 관리용 Pinia 스토어 (`*.store.ts`)
  - **컴포저블**: `app/composables/`의 재사용 가능한 컴포지션 함수
- **PrimeVue 설정**
  - 'p' 접두사를 가진 Lara 프리셋 테마 사용
  - 다크모드 선택자: `.dark`
  - PrimeVue 컴포넌트와 커스텀 TailwindCSS 클래스 결합
- **폼 처리 패턴**
  - @vee-validate/nuxt의 `VeeForm`, `VeeField`, `VeeErrorMessage` 사용
  - `@vee-validate/zod`를 사용하여 Zod 스키마와 통합

## 명령어

### 개발

- `pnpm dev` - 포트 3000에서 개발 서버 시작
- `pnpm build` - 프로덕션용 빌드
- `pnpm generate` - 정적 사이트 생성
- `pnpm preview` - 프로덕션 빌드 미리보기

### 코드 품질

- `pnpm lint` - ESLint 실행
- `pnpm lint:fix` - ESLint 문제 자동 수정
- `pnpm check-types` - TypeScript 타입 검사 실행

### 패키지 관리

- `pnpm install` - 의존성 설치 (이 프로젝트는 pnpm 사용)
- `pnpm postinstall` - 설치 후 자동 실행 (nuxt prepare)

## 아키텍처 개요

이것은 자동 임포트를 사용하는 **엔터티 기반 아키텍처**를 가진 **Nuxt 4** 애플리케이션입니다. 코드베이스는 스토어, 컴포저블, 스키마가 함께 위치한 도메인 엔터티를 중심으로 구조화되어 있습니다.

### 엔터티 기반 구조

```
app/entities/
├── auth/           # 인증 도메인 (auth.store.ts, auth-card.store.ts)
├── users/          # 사용자 관리 도메인 (users.store.ts)
├── admin/          # 관리자 기능 도메인 (admin.store.ts)
└── common/         # 공유 유틸리티와 타입 (cache.store.ts, types, declarations)
```

**현재 엔터티 구조**:

- **스토어**: `app/entities/`에 위치한 상태 관리용 Pinia 스토어 (`*.store.ts`)
- **컴포저블**: `app/composables/`의 재사용 가능한 컴포지션 함수
- **스키마**: `app/schemas/`의 Zod 유효성 검사 스키마
- **컴포넌트**: `app/components/`의 엔터티별 컴포넌트

### 자동 임포트 설정

이 프로젝트는 Nuxt의 자동 임포트 시스템을 광범위하게 사용합니다:

```typescript
// nuxt.config.ts
imports: {
  dirs: [
    'composables/**',
    'composables/**/*',
    'entities/*/*.store',
  ],
  global: true,
}
```

**주요 의미:**

- 모든 스토어, 컴포저블, 유틸리티가 자동 임포트됨
- Vue 컴포넌트에서 명시적인 import 문이 필요 없음
- 자동 임포트와의 일관성을 위해 camelCase 네이밍 사용

### 상태 관리 아키텍처

**캐시 우선 접근법**: 이중 레이어 캐싱 시스템 사용

- **주요**: TTL을 지원하는 인메모리 캐싱용 `useCacheStore()`
- **보조**: localStorage 백업용 Pinia 지속성

**인증 플로우**:

1. 로그인은 캐시 스토어(60분 TTL)와 인증 스토어 모두에 세션 저장
2. 세션 복원은 캐시를 먼저 확인한 후 localStorage 확인
3. 로그아웃은 캐시와 localStorage 모두 무효화

**주요 스토어**:

- `useAuthStore()` - 인증 및 세션 관리
- `useCacheStore()` - TTL 지원 인메모리 캐싱
- `useAdminStore()`, `useUsersStore()` - 도메인별 상태

### 폼 유효성 검사

타입 안전 유효성 검사를 위해 **Zod 스키마**를 사용:

- `app/schemas/` 디렉토리에 정의
- 폼 처리를 위해 `vee-validate`와 통합
- 스키마와 TypeScript 타입 모두 내보냄

예시: `user.schema.ts`는 `UserInfoType`, `SignInType` 등을 제공

### UI 컴포넌트 전략

- **PrimeVue 4.x**를 주요 컴포넌트 라이브러리로 사용 (TailwindCSS 통합 Lara 테마)
- **TailwindCSS 4.x**를 스타일링용 커스텀 설정과 함께 사용
- **커스텀 컴포넌트**는 다음 패턴을 따르는 엔터티별 폴더에 위치:
  ```
  components/[entity]/[ComponentName].vue
  ```

**PrimeVue 설정**:

- 'p' 접두사를 가진 Lara 프리셋 테마 사용
- 다크모드 선택자: `.dark`
- Chart와 Editor를 제외한 모든 컴포넌트 자동 임포트
- 커스텀 TailwindCSS 테마와 통합

### API 통합

- 서버 상태 관리를 위해 **TanStack Query (Vue Query)** 사용
- 컴포저블 패턴: `useGet*`, `usePost*`, `usePut*`, `useDelete*`
- 중앙화된 설정을 가진 HTTP 클라이언트용 Axios
- `app/composables/common/api/` 디렉토리의 커스텀 API 유틸리티

## 중요한 설정 사항

### TypeScript 및 Vue 3.5+ 호환성

이 프로젝트는 PrimeVue와 Vue DevTools 호환성 설정을 포함합니다:

```typescript
// nuxt.config.ts
build: {
  transpile: ['@vue/devtools-api', 'primevue'],
},
vite: {
  optimizeDeps: {
    exclude: ['@vue/devtools-api'],
  },
  ssr: {
    noExternal: ['primevue'],
  },
}
```

### 경로 해석

app 디렉토리에 Nuxt의 `~` 에일리어스 사용:

```typescript
// tsconfig.json paths
"~/*": ["./app/*"]
```

### 개발 고려사항 (템플릿 사용 시)

**엔터티 구조**: 새로운 기능을 추가할 때 엔터티 패턴을 따를 것:

1. `app/entities/[domain]/[domain].store.ts`에 스토어 추가
2. `app/composables/[domain]/`에 컴포저블 추가
3. `app/schemas/[domain].schema.ts`에 스키마 추가
4. `app/components/[domain]/`에 컴포넌트 배치
5. 페이지는 그룹 라우팅 사용: `app/pages/([domain])/`

**자동 임포트**: 스토어와 컴포저블이 자동으로 사용 가능함을 기억하세요. 새 유틸리티를 만들기 전에 기존 패턴을 확인하세요.

**캐싱 전략**: TTL이 있는 임시 데이터에는 캐시 스토어를 사용하세요. 지속적인 사용자 데이터에는 Pinia 지속성을 가진 엔터티별 스토어를 사용하세요.

**폼 처리**: 유효성 검사에 항상 Zod 스키마를 사용하세요. `schemas/` 디렉토리에 재사용 가능한 스키마를 생성하고 TypeScript 타입을 내보내세요.

**API 호출**: 직접 axios 호출보다는 기존 컴포저블 패턴(`useGet*`, `usePost*`)을 사용하세요. 이들은 캐싱 시스템과 오류 처리와 통합되어 있습니다.

**스타일링 가이드라인**:

- 'p' 접두사를 가진 PrimeVue 컴포넌트 사용 (예: `p-button`, `p-input`)
- PrimeVue 컴포넌트와 커스텀 TailwindCSS 클래스 결합
- 커스텀 색상 변수 활용: PrimeVue 테마용 `--p-primary-*`, `--p-surface-*`
- 시맨틱 색상 클래스 사용: `bg-background`, `text-foreground`, `border-border`

**폼 처리 패턴**:

- @vee-validate/nuxt의 `VeeForm`, `VeeField`, `VeeErrorMessage` 사용
- `@vee-validate/zod`를 사용하여 Zod 스키마와 통합
- 일관된 유효성 검사를 위해 auth/admin 컴포저블의 기존 패턴을 따르기

### 템플릿 사용 주의사항

**이 프로젝트는 개발 템플릿입니다**. 실제 프로젝트에 사용할 때는 다음을 고려해야 합니다:

1. **백엔드 API 및 데이터베이스 연결**: 현재 예시 컴포저블들은 실제 API를 호출하지 않습니다.
2. **인증 시스템**: JWT 토큰 검증 로직을 백엔드에서 구현해야 합니다.
3. **환경 설정**: `.env` 파일과 각종 설정을 실제 프로젝트에 맞게 수정해야 합니다.
4. **샘플 데이터 교체**: 현재 데이터는 예시용이므로 실제 데이터로 교체해야 합니다.
5. **불필요한 코드 제거**: 예시 컴포넌트와 테스트 코드를 실제 기능에 맞게 수정하거나 제거
6. **프로젝트별 커스터마이징**: 브랜딩, 색상, 레이아웃 등을 프로젝트에 맞게 수정
