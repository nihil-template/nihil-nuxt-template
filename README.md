# Nuxt.js 앱 - 자동 임포트 가이드

## 개요

이 Nuxt.js 앱은 엔티티 기반 아키텍처를 사용하며, 훅, 스토어, 쿼리 키 등을 자동으로 임포트할 수 있도록 설정되어 있습니다.

## 자동 임포트 설정

### nuxt.config.ts 설정

```typescript
imports: {
  dirs: [
    'stores',
    'entities/*/hooks',
    'entities/*/stores',
    'entities/*/keys',
  ],
},
```

### 자동 임포트 대상

- **stores**: `~/stores/` 폴더의 모든 스토어
- **entities/\*/hooks**: 각 엔티티의 훅 폴더
- **entities/\*/stores**: 각 엔티티의 스토어 폴더 (향후 확장용)
- **entities/\*/keys**: 각 엔티티의 쿼리 키

## 사용법

### 1. 훅 자동 임포트

```typescript
// 별도 import 없이 바로 사용 가능
const { session, loading } = useGetSession();
const { mutate: signIn, isPending } = useSignIn();
const { mutate: signUp, isPending } = useSignUp();
```

### 2. 스토어 자동 임포트

```typescript
// 별도 import 없이 바로 사용 가능
const authStore = useAuthStore();
const { setAuthCardHeader } = authStore;
```

### 3. 쿼리 키 자동 임포트

```typescript
// 별도 import 없이 바로 사용 가능
const key = authKeys.session();
const listKey = authKeys.list(params);
```

## 엔티티 구조

```
app/entities/
├── auth/
│   ├── hooks/
│   │   ├── use-get-session.ts
│   │   ├── use-sign-in.ts
│   │   ├── use-sign-up.ts
│   │   └── index.ts
│   └── auth.keys.ts
└── common/
    ├── hooks/
    │   ├── api/
    │   │   ├── use-get.ts
    │   │   ├── use-post.ts
    │   │   └── ...
    │   └── index.ts
    └── common.types.ts
```

## 주의사항

1. **명시적 export**: 각 폴더의 `index.ts`에서 사용할 훅들을 명시적으로 export해야 합니다.
2. **타입 안전성**: TypeScript 타입 정의를 통해 자동 완성과 타입 체크를 지원합니다.
3. **네이밍 컨벤션**: 훅 이름은 `use`로 시작하고 camelCase를 사용합니다.

## 예시

### 컴포넌트에서 사용

```vue
<script setup lang="ts">
// 별도 import 없이 자동으로 사용 가능
const { session, loading } = useGetSession();
const { mutate: signIn, isPending } = useSignIn({
  onSuccess: () => {
    navigateTo('/');
  },
  onError: (error) => {
    console.error('로그인 실패:', error);
  },
});
</script>
```

### 스토어에서 사용

```typescript
// 별도 import 없이 자동으로 사용 가능
export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: null,
    authCardHeader: {},
  }),
  actions: {
    setSession(session) {
      this.session = session;
    },
  },
});
```

이 설정을 통해 개발자는 별도의 import 문 없이도 엔티티의 훅과 스토어를 바로 사용할 수 있어 개발 생산성이 크게 향상됩니다.
