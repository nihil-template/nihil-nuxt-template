# CLAUDE.md - 레이아웃

이 파일은 Claude Code (claude.ai/code)가 `/app/layouts/` 디렉토리에서 작업할 때 제공되는 가이드라인입니다.

## 🚨 템플릿 프로젝트 주의사항

이 프로젝트는 **개발 템플릿**입니다. 레이아웃들은 예시용으로 제공되며, 실제 프로젝트에서는:
- 예시 레이아웃을 실제 디자인 요구사항에 맞게 수정
- 불필요한 예시 레이아웃은 제거
- 프로젝트 브랜딩에 맞게 헤더, 푸터, 네비게이션 수정
- 실제 사용자 권한에 맞게 레이아웃 구조 조정

## 레이아웃 시스템

### Nuxt 4 레이아웃 구조

Nuxt 4는 `app/layouts/` 디렉토리의 레이아웃을 자동으로 인식하며, 페이지에서 `definePageMeta()`를 통해 사용할 수 있습니다.

### 현재 레이아웃 구조

```
app/layouts/
├── default.vue      # 기본 레이아웃
├── auth.vue         # 인증 페이지용 레이아웃 (예시)
├── admin.vue        # 관리자 페이지용 레이아웃 (예시)
└── error.vue        # 에러 페이지 레이아웃
```

### 레이아웃 작성 규칙

#### 기본 구조

```vue
<script setup lang="ts">
// 레이아웃별 로직
// 예: 인증 확인, 권한 체크 등
</script>

<template>
  <div>
    <!-- 헤더 -->
    <header>
      <!-- 네비게이션, 로고 등 -->
    </header>

    <!-- 메인 콘텐츠 -->
    <main>
      <slot />
    </main>

    <!-- 푸터 -->
    <footer>
      <!-- 저작권, 링크 등 -->
    </footer>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

/* 레이아웃별 스타일 */
</style>
```

#### 필수 요소

1. **slot**: 페이지 콘텐츠가 들어갈 슬롯
2. **반응형 디자인**: 모바일부터 데스크톱까지 대응
3. **접근성**: 적절한 시맨틱 HTML 구조
4. **SEO**: 검색 엔진 최적화를 위한 구조

### 레이아웃별 특징

#### default.vue
- 일반적인 페이지에서 사용
- 헤더, 메인, 푸터의 기본 구조
- 사용자 인증 상태에 따른 네비게이션 변화

#### auth.vue (예시)
- 로그인, 회원가입 등 인증 페이지용
- 중앙 정렬된 카드 형태의 레이아웃
- 최소한의 네비게이션

#### admin.vue (예시)
- 관리자 페이지 전용 레이아웃
- 사이드바 네비게이션
- 관리자 전용 헤더

#### error.vue
- 에러 페이지 전용 레이아웃
- 에러 메시지 표시
- 홈으로 돌아가기 링크

### 컴포넌트 활용

레이아웃에서는 공통 컴포넌트를 적극 활용합니다:

```vue
<template>
  <div>
    <HeaderNavigation />
    <main>
      <slot />
    </main>
    <FooterContent />
  </div>
</template>
```

### 스타일링 가이드

#### TailwindCSS 활용

```vue
<style scoped>
@reference '~/assets/styles/tailwind.css';

.layout-container {
  @apply min-h-screen flex flex-col;
}

.main-content {
  @apply flex-1 container mx-auto px-4 py-8;
}

/* 다크모드 지원 */
.header {
  @apply bg-background border-b border-border;
}

.dark .header {
  @apply bg-background border-border;
}
</style>
```

#### 반응형 디자인

```css
/* 모바일 우선 접근법 */
.nav-menu {
  @apply hidden mo-md:flex;
}

/* 커스텀 중단점 활용 */
@media (min-width: 768px) {
  .sidebar {
    @apply block;
  }
}
```

### 페이지에서 레이아웃 사용

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'admin', // 관리자 레이아웃 사용
});
</script>
```

### 동적 레이아웃

조건에 따라 다른 레이아웃을 사용할 수 있습니다:

```vue
<script setup lang="ts">
const authStore = useAuthStore();

definePageMeta({
  layout: computed(() =>
    authStore.isAdmin ? 'admin' : 'default'
  ),
});
</script>
```

### 레이아웃 중첩

Nuxt 4에서는 레이아웃 중첩이 가능합니다:

```vue
<!-- parent.vue -->
<template>
  <div>
    <CommonHeader />
    <NuxtLayout name="child">
      <slot />
    </NuxtLayout>
  </div>
</template>
```

### 성능 최적화

#### 지연 로딩

```vue
<script setup lang="ts">
// 무거운 컴포넌트는 지연 로딩
const HeavyComponent = defineAsyncComponent(
  () => import('~/components/HeavyComponent.vue')
);
</script>
```

#### 이미지 최적화

```vue
<template>
  <NuxtImg
    src="/logo.png"
    alt="로고"
    width="200"
    height="60"
    loading="eager"
  />
</template>
```

### 접근성 고려사항

```vue
<template>
  <div>
    <!-- 건너뛰기 링크 -->
    <a href="#main-content" class="sr-only focus:not-sr-only">
      메인 콘텐츠로 건너뛰기
    </a>

    <header role="banner">
      <nav role="navigation" aria-label="주 네비게이션">
        <!-- 네비게이션 메뉴 -->
      </nav>
    </header>

    <main id="main-content" role="main">
      <slot />
    </main>

    <footer role="contentinfo">
      <!-- 푸터 콘텐츠 -->
    </footer>
  </div>
</template>
```

### 템플릿에서 실제 프로젝트로 전환 시

1. **디자인 시스템 적용**: 실제 프로젝트 브랜딩에 맞게 색상, 폰트, 레이아웃 수정
2. **불필요한 레이아웃 제거**: auth, admin 등 사용하지 않는 예시 레이아웃 삭제
3. **네비게이션 구조**: 실제 사이트맵에 맞게 메뉴 구조 조정
4. **권한 기반 표시**: 실제 사용자 권한에 맞게 조건부 렌더링 수정
5. **SEO 최적화**: 실제 서비스에 맞는 메타 태그 및 구조화 데이터 적용
6. **성능 최적화**: 실제 콘텐츠에 맞게 로딩 전략 조정
7. **접근성 개선**: 실제 사용자 요구사항에 맞는 접근성 기능 구현