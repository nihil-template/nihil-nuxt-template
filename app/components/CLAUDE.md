# CLAUDE.md - 컴포넌트

이 파일은 `/app/components/` 디렉토리의 컴포넌트 작성 및 관리 가이드라인을 제공합니다.

## 🚨 템플릿 프로젝트 주의사항

이 프로젝트는 **개발 템플릿**입니다. 컴포넌트들은 예시용으로 제공되며, 실제 프로젝트에서는:
- 예시 컴포넌트들을 실제 UI 요구사항에 맞게 수정
- 불필요한 예시 컴포넌트는 제거
- 실제 API 연동에 맞게 데이터 처리 로직 수정
- 프로젝트 브랜딩에 맞게 디자인 시스템 조정

## 디렉토리 구조

### 도메인별 컴포넌트 분류
```
app/components/
├── auth/               # 인증 관련 컴포넌트
├── common/             # 공통 재사용 컴포넌트
│   └── layout/        # 레이아웃 관련 컴포넌트
├── profile/            # 프로필 관련 컴포넌트
└── users/              # 사용자 관리 컴포넌트
```

### 도메인별 역할 분담
- **auth**: 로그인, 회원가입, 비밀번호 관련 폼과 UI
- **users**: 사용자 목록, 검색, 상세보기 컴포넌트
- **profile**: 사용자 프로필 관리 및 설정 컴포넌트
- **common**: 여러 도메인에서 재사용되는 범용 컴포넌트

## Vue 파일 구조 규칙

### **CRITICAL**: 파일 작성 순서 엄수
모든 Vue 컴포넌트는 반드시 다음 순서로 작성해야 합니다:
1. **script setup + lang="ts"** (첫 번째)
2. **template** (두 번째)
3. **style scoped** (세 번째)

이 순서는 프로젝트 전반의 일관성을 위해 반드시 지켜야 하며, pages와 동일한 규칙입니다.

## 컴포넌트 네이밍 규칙

### 페이지 렌더링 컴포넌트
각 페이지에서 사용되는 주요 렌더링 컴포넌트는 다음 패턴을 따릅니다:
- **페이지 컴포넌트**: [PageName]Page.vue (예: ProfilePage.vue)
- **폼 컴포넌트**: [Action]Form.vue (예: SignInForm.vue, ResetPasswordForm.vue)
- **리스트 컴포넌트**: [Entity]List.vue (예: UserList.vue)
- **상세보기 컴포넌트**: [Entity]Detail.vue (예: UserDetail.vue)
- **검색 컴포넌트**: [Entity]Search.vue (예: UserSearch.vue)

### 파일 네이밍 규칙
- PascalCase 사용 (Vue 컴포넌트 표준)
- 명확하고 구체적인 이름 사용
- 동사 + 명사 조합으로 기능 명시

## 컴포넌트 작성 패턴

### 폼 컴포넌트 패턴
폼 컴포넌트는 다음 요소들을 포함해야 합니다:
- **Zod 스키마 기반 유효성 검사**: toTypedSchema와 VeeValidate 활용
- **컴포저블 연동**: 관련 도메인 컴포저블 사용
- **에러 처리**: 실시간 유효성 검사 및 에러 메시지 표시
- **접근성**: 적절한 label, id, autocomplete 속성

### 리스트 컴포넌트 패턴
리스트 컴포넌트는 다음 기능들을 포함해야 합니다:
- **데이터 로딩 상태 관리**: 로딩, 에러, 빈 상태 처리
- **PrimeVue DataTable 활용**: 페이지네이션, 정렬, 필터링 기능
- **액션 버튼**: 상세보기, 수정, 삭제 등 작업 버튼
- **반응형 디자인**: 다양한 화면 크기 대응

### 상세보기 컴포넌트 패턴
상세보기 컴포넌트는 다음 구조를 따릅니다:
- **동적 파라미터 처리**: props를 통한 ID 전달
- **데이터 포맷팅**: 날짜, 권한, 상태 등 적절한 형식 변환
- **액션 영역**: 편집, 삭제 등 관련 작업 버튼
- **로딩 및 에러 상태**: 적절한 fallback UI 제공

## Common 컴포넌트 전략

### 재사용 가능한 컴포넌트
common 디렉토리에는 여러 도메인에서 공통으로 사용되는 컴포넌트만 배치합니다:
- **레이아웃 컴포넌트**: 헤더, 푸터, 사이드바 등
- **UI 유틸리티**: 로딩 스피너, 에러 메시지, 빈 상태 등
- **범용 폼 요소**: 공통 입력 필드, 버튼 스타일 등
- **CVA 기반 컴포넌트**: class-variance-authority를 활용한 variant 시스템

### Common 컴포넌트 작성 시 고려사항
- **높은 재사용성**: 특정 도메인에 종속되지 않는 범용적 설계
- **Props 인터페이스**: 명확하고 유연한 props 정의
- **Variant 시스템**: CVA를 활용한 다양한 스타일 변형 지원
- **접근성**: WCAG 가이드라인 준수

## 스타일링 가이드라인

### TailwindCSS 4.x 활용
모든 컴포넌트는 TailwindCSS 4.x의 커스텀 설정을 활용해야 합니다:
- **@reference 필수**: style 블록에 `@reference '~/assets/styles/tailwind.css'` 포함
- **커스텀 폰트 사이즈**: text-xs, text-sm, text-md, text-lg, text-h1~h6 활용
- **PrimeVue 통합**: tailwindcss-primeui 플러그인과 조화
- **다크모드 지원**: .dark 클래스 기반 다크모드 스타일

### 스타일 구조화
```css
@reference '~/assets/styles/tailwind.css';

/* 컴포넌트별 커스텀 스타일 */
.component-specific-class {
  @apply utility-classes;
}

/* 상태별 스타일 */
.error {
  @apply border-red-500 ring-red-500;
}

/* 반응형 스타일 */
@media (min-width: 768px) {
  .responsive-class {
    @apply md:specific-styles;
  }
}
```

## PrimeVue 컴포넌트 활용

### 자동 임포트 설정
PrimeVue 컴포넌트는 모두 자동 임포트되므로 별도 import 없이 사용 가능합니다:
- **p- 접두사**: 모든 PrimeVue 컴포넌트는 p- 접두사로 사용
- **예외 컴포넌트**: Chart, Editor는 수동 임포트 필요
- **Form 컴포넌트**: VeeForm, VeeField, VeeErrorMessage는 VeeValidate 커스텀 설정

### PrimeVue 활용 패턴
- **DataTable**: 리스트 컴포넌트의 주요 UI
- **Button**: 일관된 버튼 스타일링
- **InputText**: 폼 입력 필드
- **Message**: 에러 및 정보 메시지
- **ProgressSpinner**: 로딩 상태 표시
- **Toast**: 전역 알림 (useToast 컴포저블과 연동)

## 컴포넌트 상태 관리

### Props와 Emits 패턴
```typescript
// Props 정의
interface Props {
  userId?: number;
  readonly?: boolean;
}

// Emits 정의
interface Emits {
  searchResult: [user: UserInfoType | null];
  clearSearch: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
```

### 컴포저블 연동
컴포넌트는 관련 도메인의 컴포저블과 긴밀하게 연동해야 합니다:
- **데이터 페칭**: useGet* 계열 컴포저블 활용
- **상태 변경**: usePost*, usePut*, useDelete* 계열 컴포저블 활용
- **스토어 연동**: 필요시 도메인별 Pinia 스토어와 연결

## 접근성 및 사용성

### 접근성 고려사항
- **키보드 네비게이션**: 모든 인터랙티브 요소에 적절한 탭 순서
- **스크린 리더**: aria-label, role 속성 적절히 활용
- **폼 접근성**: label과 input의 연결, 에러 메시지 읽기
- **색상 대비**: 충분한 색상 대비율 확보

### 사용성 개선
- **로딩 상태**: 사용자에게 명확한 피드백 제공
- **에러 처리**: 친화적이고 구체적인 에러 메시지
- **빈 상태**: 데이터가 없을 때 적절한 안내 메시지
- **반응형**: 다양한 디바이스에서 최적화된 경험

## 성능 최적화

### 컴포넌트 최적화 전략
- **지연 로딩**: 무거운 컴포넌트는 defineAsyncComponent 활용
- **메모이제이션**: computed, watchEffect 적절히 활용
- **이벤트 최적화**: 불필요한 리렌더링 방지
- **이미지 최적화**: NuxtImg 컴포넌트 활용

### 번들 크기 관리
- **트리 셰이킹**: 사용하지 않는 라이브러리 제거
- **조건부 임포트**: 필요한 경우에만 컴포넌트 로드
- **코드 분할**: 라우트별 컴포넌트 청크 분리

### 템플릿에서 실제 프로젝트로 전환 시

1. **예시 컴포넌트 검토**: 각 도메인별 예시 컴포넌트가 실제 요구사항에 맞는지 확인
2. **디자인 시스템 적용**: 프로젝트 브랜딩에 맞게 색상, 폰트, 간격 등 수정
3. **API 연동**: 예시 데이터를 실제 API 호출로 변경
4. **폼 검증**: 실제 비즈니스 규칙에 맞게 유효성 검사 로직 수정
5. **접근성**: 실제 사용자 요구사항에 맞는 접근성 개선
6. **성능 최적화**: 실제 사용 패턴에 맞게 로딩 전략 조정
7. **불필요한 컴포넌트 제거**: 사용하지 않는 예시 컴포넌트 삭제