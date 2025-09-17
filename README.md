# Nuxt 4 사용자 인증 템플릿

사용자 인증, 관리자 관리, 프로필 관리 기능을 포함한 Nuxt 4 기반 웹 애플리케이션 템플릿입니다.

## 프로젝트 개요

이 프로젝트는 **실제 운영 가능한 웹 애플리케이션**을 빠르게 구축할 수 있도록 설계된 템플릿입니다.
완전한 사용자 인증 시스템과 관리자 기능, 그리고 확장 가능한 엔티티 기반 아키텍처를 제공합니다.

## 주요 기능

### 🔐 인증 시스템
- 회원가입/로그인/로그아웃
- 비밀번호 찾기/재설정
- 세션 관리 (60분 TTL)
- 토큰 자동 재발급

### 👤 사용자 관리
- 프로필 조회/수정
- 비밀번호 변경
- 회원탈퇴
- 사용자 목록 조회

### 👨‍💼 관리자 기능
- 관리자 회원가입
- 관리자 대시보드
- 사용자 관리

## 개발 가이드

### 새 기능 개발하기

1. **페이지 추가**
   ```
   app/pages/(도메인)/경로.vue
   ```

2. **컴포넌트 추가**
   ```
   app/components/도메인/ComponentName.vue
   ```

3. **API 연동**
   ```
   app/composables/도메인/useActionName.ts
   ```

4. **상태 관리**
   ```
   app/entities/도메인/domain.store.ts
   ```

5. **폼 검증**
   ```
   app/schemas/entity.schema.ts
   ```

### 예시: 새 도메인 추가

"products" 도메인을 추가한다면:

```
app/
├── pages/(products)/products/
├── components/products/
├── composables/products/
├── entities/products/
└── schemas/products.schema.ts
```

## 기술 스택

- **프레임워크**: Nuxt 4 + Vue 3.5
- **언어**: TypeScript
- **상태관리**: Pinia + 캐시 시스템
- **API**: TanStack Query
- **UI**: Nuxt UI 3 + Reka UI
- **검증**: Zod + vee-validate
- **패키지매니저**: pnpm

## 개발 명령어

```bash
# 개발 서버 시작
pnpm dev

# 빌드
pnpm build

# 코드 품질 검사
pnpm lint
pnpm check-types
```

## 프로젝트 구조

```
app/
├── pages/           # 라우트 페이지
│   ├── (auth)/      # 인증 관련 페이지
│   ├── (admin)/     # 관리자 페이지
│   ├── (profile)/   # 프로필 페이지
│   └── (users)/     # 사용자 관리 페이지
├── components/      # Vue 컴포넌트
├── composables/     # 컴포지션 함수
├── entities/        # 도메인별 비즈니스 로직
├── layouts/         # 레이아웃 컴포넌트
└── schemas/         # Zod 검증 스키마
```

이 템플릿을 사용하면 복잡한 설정 없이 바로 비즈니스 로직 개발에 집중할 수 있습니다.