<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/entities/auth/auth.store';

// 세션 복원/검증은 계속 사용하되, UI는 스토어 세션을 단일 소스로 사용
const { pending: isPending, invalidate: invalidateSession, } = useGetSession();
const { mutate: signOut, } = useSignOut();
const authStore = useAuthStore();
const { session, } = storeToRefs(authStore);

const handleSignOut = () => {
  signOut(null);
  // 로그아웃 후 세션 캐시 무효화 및 스토어 클리어
  invalidateSession();
  authStore.signout();
};
</script>

<template>
  <ClientOnly>
    <div
      v-if='isPending'
      class='flex items-center gap-2'
    >
      <Skeleton class='h-10 w-48' />
    </div>
    <div
      v-else
      class='flex items-center gap-2'
    >
      <template v-if='session'>
        <span class='hidden text-sm font-medium sm:inline'>
          {{ session.userNm || session.emlAddr }}님
        </span>
        <Button
          variant='ghost'
          as-child
        >
          <NuxtLink to='/profile'>
            마이페이지
          </NuxtLink>
        </Button>
        <Button
          variant='ghost'
          @click='handleSignOut'
        >
          로그아웃
        </Button>
      </template>
      <template v-else>
        <Button
          variant='ghost'
          as-child
        >
          <NuxtLink to='/auth/signin'>
            로그인
          </NuxtLink>
        </Button>
        <Button as-child>
          <NuxtLink to='/auth/signup'>
            회원가입
          </NuxtLink>
        </Button>
      </template>
    </div>
  </ClientOnly>
</template>
