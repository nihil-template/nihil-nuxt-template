<script setup lang="ts">
const { session } = useGetSession();
const { mutate: signOut } = useSignOut();

const onSignOut = async () => {
  await signOut();
};

// 세션 상태에 따른 로그인 여부 확인
const isLoggedIn = computed(() => !!session.value);
</script>

<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to='/'>
          홈
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to='/users'>
          사용자 목록
        </NuxtLink>
      </li>

      <!-- 세션 상태가 로딩 중일 때는 기본 메뉴만 표시 -->
      <ClientOnly>
        <!-- 로그인하지 않은 상태 -->
        <template v-if='!isLoggedIn'>
          <li>
            <NuxtLink to='/auth/signin'>
              로그인
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to='/auth/signup'>
              회원가입
            </NuxtLink>
          </li>
        </template>

        <!-- 로그인한 상태 -->
        <template v-else>
          <li v-if="session?.userRole === 'ADMIN'">
            <NuxtLink to='/admin'>
              관리자 페이지
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to='/profile'>
              마이페이지
            </NuxtLink>
          </li>
          <li>
            <Button
              type='button'
              label='로그아웃'
              severity='danger'
              @click='onSignOut'
            />
          </li>
        </template>
      </ClientOnly>
    </ul>
  </nav>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

nav ul {
  @apply flex items-center gap-4;
}

nav li {
  @apply list-none;
}

nav a {
  @apply text-gray-700 hover:text-blue-600 font-medium transition-colors;
}

nav a.router-link-active {
  @apply text-blue-600 font-semibold;
}
</style>
