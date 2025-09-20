# CLAUDE.md - 엔터티

이 파일은 Claude Code (claude.ai/code)가 `/app/entities/` 디렉토리에서 작업할 때 제공되는 가이드라인입니다.

## 🚨 템플릿 프로젝트 주의사항

이 프로젝트는 **개발 템플릿**입니다. 엔터티들은 예시용으로 제공되며, 실제 프로젝트에서는:
- 예시 엔터티들을 실제 비즈니스 도메인에 맞게 수정
- 불필요한 예시 엔터티는 제거 (auth, users, admin 등)
- 실제 프로젝트에 필요한 새로운 엔터티 추가
- 실제 백엔드 API 구조에 맞게 스토어 로직 수정

## 엔터티 기반 아키텍처

### 디렉토리 구조

```
app/entities/
├── auth/           # 인증 도메인 (예시)
├── users/          # 사용자 관리 도메인 (예시)
├── admin/          # 관리자 기능 도메인 (예시)
└── common/         # 공유 유틸리티와 타입
```

### 엔터티별 구성 요소

각 엔터티 폴더는 다음 구성 요소를 가집니다:

1. **스토어 파일** (`*.store.ts`): Pinia 스토어로 해당 도메인의 상태 관리
2. **타입 정의**: 도메인별 TypeScript 타입 및 인터페이스
3. **상수**: 도메인별 상수 값들
4. **유틸리티**: 도메인별 헬퍼 함수들

### 스토어 작성 규칙

#### 기본 구조

```typescript
export const use[Domain]Store = defineStore('[domain]', () => {
  // 상태
  const state = ref<StateType>({});

  // 액션
  const actions = {
    // CRUD 액션들
  };

  // 게터
  const getters = computed(() => {
    // 계산된 값들
  });

  return {
    state,
    ...actions,
    getters,
  };
}, {
  persist: {
    storage: persistedState.localStorage,
  },
});
```

#### 필수 포함 요소

1. **상태 초기화**: 명확한 초기 상태 정의
2. **CRUD 액션**: Create, Read, Update, Delete 기본 액션
3. **에러 처리**: 모든 액션에 적절한 에러 처리
4. **타입 안전성**: TypeScript 타입 완전 적용
5. **Pinia 지속성**: 필요시 localStorage 연동

### Common 엔터티 특별 규칙

`common/` 엔터티는 다른 엔터티들과 달리 다음을 포함합니다:

1. **캐시 스토어**: 전역 캐싱 시스템
2. **공통 타입**: 모든 도메인에서 사용하는 공통 타입
3. **전역 상수**: 프로젝트 전반에서 사용하는 상수
4. **유틸리티 함수**: 도메인 무관한 헬퍼 함수

### 자동 임포트 설정

모든 스토어는 Nuxt의 자동 임포트 시스템에 의해 자동으로 등록됩니다:

```typescript
// nuxt.config.ts
imports: {
  dirs: [
    'entities/*/*.store',
  ],
}
```

따라서 Vue 컴포넌트나 컴포저블에서 명시적 import 없이 직접 사용할 수 있습니다.

### 새 엔터티 추가 가이드

1. **폴더 생성**: `app/entities/[domain]/` 디렉토리 생성
2. **스토어 파일**: `[domain].store.ts` 파일 생성
3. **타입 정의**: 필요시 `types.ts` 파일 생성
4. **컴포저블 연동**: `app/composables/[domain]/` 폴더에 관련 컴포저블 생성
5. **스키마 정의**: `app/schemas/[domain].schema.ts`에 관련 스키마 생성
6. **컴포넌트**: `app/components/[domain]/`에 관련 컴포넌트 생성

### 엔터티 간 의존성 관리

- **느슨한 결합**: 엔터티 간 직접적인 의존성 최소화
- **공통 타입**: `common/` 엔터티를 통한 공유 타입 관리
- **이벤트 기반**: 필요시 이벤트 시스템을 통한 통신
- **캐시 활용**: `common/cache.store.ts`를 통한 데이터 공유

### 템플릿에서 실제 프로젝트로 전환 시

1. **도메인 분석**: 실제 비즈니스 도메인에 맞게 엔터티 구조 재설계
2. **예시 엔터티 정리**: auth, users, admin 등 불필요한 예시 엔터티 제거
3. **새 엔터티 추가**: 실제 프로젝트에 필요한 도메인별 엔터티 생성
4. **API 연동**: 실제 백엔드 API에 맞게 스토어 액션 수정
5. **상태 구조**: 실제 데이터 구조에 맞게 상태 정의 조정
6. **지속성 설정**: 보안 요구사항에 맞게 localStorage 사용 여부 결정