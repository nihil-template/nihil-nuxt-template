<script setup lang="ts">
// 관리자 사이드바 - 관리자 기능별 네비게이션
</script>

<template>
  <aside>
    <div class='sidebar-header'>
      <h3>관리 메뉴</h3>
    </div>

    <nav class='sidebar-nav'>
      <ul>
        <li>
          <NuxtLink to='/admin' class='nav-item'>
            <i class='pi pi-chart-line' />
            <span>대시보드</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to='/users' class='nav-item'>
            <i class='pi pi-users' />
            <span>사용자 관리</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to='/admin/new-admin' class='nav-item'>
            <i class='pi pi-user-plus' />
            <span>관리자 추가</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to='/admin/settings' class='nav-item'>
            <i class='pi pi-cog' />
            <span>시스템 설정</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to='/admin/logs' class='nav-item'>
            <i class='pi pi-file-text' />
            <span>로그 관리</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

aside {
  @apply w-64 bg-white border-r border-gray-200 flex flex-col;
}

.sidebar-header {
  @apply p-4 border-b border-gray-200;
}

.sidebar-header h3 {
  @apply text-h6 font-semibold text-gray-900;
}

.sidebar-nav {
  @apply flex-1 p-4;
}

.sidebar-nav ul {
  @apply space-y-2;
}

.sidebar-nav li {
  @apply list-none;
}

.nav-item {
  @apply flex items-center gap-3 w-full p-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-2 transition-colors font-medium;
}

.nav-item.router-link-active {
  @apply bg-blue-50 text-blue-600 font-semibold;
}

.nav-item i {
  @apply text-h6 w-5 h-5 flex items-center justify-center;
}

.nav-item span {
  @apply flex-1;
}
</style>
