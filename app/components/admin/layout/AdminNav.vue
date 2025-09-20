<script setup lang="ts">
const { session } = useGetSession();
const { mutate: signOut } = useSignOut();

const onSignOut = async () => {
  await signOut();
};
</script>

<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to='/'>
          <i class='pi pi-home' />
          홈으로
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to='/users'>
          <i class='pi pi-users' />
          사용자 관리
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to='/admin'>
          <i class='pi pi-chart-line' />
          대시보드
        </NuxtLink>
      </li>

      <ClientOnly>
        <template v-if='session'>
          <li class='user-info'>
            <span class='user-name'>
              {{ session.userNm }}
            </span>
            <span class='user-role'>
              관리자
            </span>
          </li>
          <li>
            <Button
              type='button'
              label='로그아웃'
              icon='pi pi-sign-out'
              severity='danger'
              size='small'
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
  @apply flex items-center gap-6;
}

nav li {
  @apply list-none;
}

nav a {
  @apply flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-2 hover:bg-blue-50;
}

nav a.router-link-active {
  @apply text-blue-600 bg-blue-50 font-semibold;
}

nav a i {
  @apply text-sm;
}

.user-info {
  @apply flex flex-col items-end text-sm text-gray-600 px-3;
}

.user-name {
  @apply font-semibold text-gray-900;
}

.user-role {
  @apply text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full;
}
</style>
