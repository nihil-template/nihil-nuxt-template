<script setup lang="ts">
const { session } = useGetSession();

// 대시보드 통계 데이터 (향후 실제 API로 교체)
const stats = ref([
  {
    title: '총 사용자',
    value: '1,234',
    icon: 'pi pi-users',
    color: 'blue',
    change: '+12%',
  },
  {
    title: '월간 활성 사용자',
    value: '867',
    icon: 'pi pi-chart-line',
    color: 'green',
    change: '+8%',
  },
  {
    title: '오늘 로그인',
    value: '156',
    icon: 'pi pi-sign-in',
    color: 'purple',
    change: '+24%',
  },
  {
    title: '시스템 상태',
    value: '정상',
    icon: 'pi pi-check-circle',
    color: 'emerald',
    change: '99.9%',
  },
]);

const recentActivities = ref([
  {
    id: 1,
    user: '홍길동',
    action: '로그인',
    time: '10분 전',
    status: 'success',
  },
  {
    id: 2,
    user: '김철수',
    action: '프로필 수정',
    time: '15분 전',
    status: 'info',
  },
  {
    id: 3,
    user: '이영희',
    action: '비밀번호 변경',
    time: '25분 전',
    status: 'warning',
  },
  {
    id: 4,
    user: '박민수',
    action: '계정 생성',
    time: '1시간 전',
    status: 'success',
  },
]);
</script>

<template>
  <div class='dashboard-container'>
    <!-- 대시보드 헤더 -->
    <div class='dashboard-header'>
      <h1>관리자 대시보드</h1>
      <ClientOnly>
        <p class='welcome-message'>
          안녕하세요, {{ session?.userNm }}님! 시스템 현황을 확인하세요.
        </p>
      </ClientOnly>
    </div>

    <!-- 통계 카드 그리드 -->
    <div class='stats-grid'>
      <div
        v-for='stat in stats'
        :key='stat.title'
        class='stat-card'
        :class='`stat-${stat.color}`'
      >
        <div class='stat-content'>
          <div class='stat-icon'>
            <i :class='stat.icon' />
          </div>
          <div class='stat-info'>
            <h3 class='stat-title'>
              {{ stat.title }}
            </h3>
            <p class='stat-value'>
              {{ stat.value }}
            </p>
            <span class='stat-change'>
              {{ stat.change }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 대시보드 콘텐츠 그리드 -->
    <div class='dashboard-grid'>
      <!-- 최근 활동 -->
      <div class='dashboard-card'>
        <div class='card-header'>
          <h2>최근 활동</h2>
          <Button
            label='전체 보기'
            link
            size='small'
          />
        </div>
        <div class='activity-list'>
          <div
            v-for='activity in recentActivities'
            :key='activity.id'
            class='activity-item'
          >
            <div class='activity-avatar'>
              {{ activity.user[0] }}
            </div>
            <div class='activity-details'>
              <div class='activity-main'>
                <span class='activity-user'>
                  {{ activity.user }}
                </span>
                <span class='activity-action'>
                  {{ activity.action }}
                </span>
              </div>
              <span class='activity-time'>
                {{ activity.time }}
              </span>
            </div>
            <div
              class='activity-status'
              :class='`status-${activity.status}`'
            />
          </div>
        </div>
      </div>

      <!-- 빠른 액션 -->
      <div class='dashboard-card'>
        <div class='card-header'>
          <h2>빠른 액션</h2>
        </div>
        <div class='quick-actions'>
          <NuxtLink
            to='/users'
            class='action-button group'
          >
            <i class='pi pi-users' />
            <span>사용자 관리</span>
          </NuxtLink>
          <NuxtLink
            to='/admin/settings'
            class='action-button group'
          >
            <i class='pi pi-cog' />
            <span>시스템 설정</span>
          </NuxtLink>
          <NuxtLink
            to='/admin/logs'
            class='action-button group'
          >
            <i class='pi pi-file-text' />
            <span>로그 확인</span>
          </NuxtLink>
          <NuxtLink
            to='/admin/new-admin'
            class='action-button group'
          >
            <i class='pi pi-user-plus' />
            <span>관리자 추가</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.dashboard-container {
  @apply space-y-6;
}

.dashboard-header {
  @apply mb-8;
}

.dashboard-header h1 {
  @apply text-h2 font-bold text-gray-900 mb-2;
}

.welcome-message {
  @apply text-gray-600;
}

/* 통계 카드 그리드 */
.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8;
}

.stat-card {
  @apply bg-white rounded-2 p-6 shadow-sm border;
}

.stat-content {
  @apply flex items-center gap-4;
}

.stat-icon {
  @apply w-12 h-12 rounded-2 flex items-center justify-center text-white text-lg;
}

.stat-card.stat-blue .stat-icon {
  @apply bg-blue-500;
}

.stat-card.stat-green .stat-icon {
  @apply bg-green-500;
}

.stat-card.stat-purple .stat-icon {
  @apply bg-purple-500;
}

.stat-card.stat-emerald .stat-icon {
  @apply bg-emerald-500;
}

.stat-info {
  @apply flex-1;
}

.stat-title {
  @apply text-sm text-gray-600 mb-1;
}

.stat-value {
  @apply text-h4 font-bold text-gray-900 mb-1;
}

.stat-change {
  @apply text-sm text-green-600 font-medium;
}

/* 대시보드 그리드 */
.dashboard-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.dashboard-card {
  @apply bg-white rounded-2 shadow-sm border;
}

.card-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.card-header h2 {
  @apply text-h6 font-semibold text-gray-900;
}

/* 활동 목록 */
.activity-list {
  @apply p-6 space-y-4;
}

.activity-item {
  @apply flex items-center gap-4;
}

.activity-avatar {
  @apply w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm;
}

.activity-details {
  @apply flex-1;
}

.activity-main {
  @apply flex items-center gap-2 mb-1;
}

.activity-user {
  @apply font-medium text-gray-900;
}

.activity-action {
  @apply text-gray-600;
}

.activity-time {
  @apply text-sm text-gray-500;
}

.activity-status {
  @apply w-3 h-3 rounded-full;
}

.status-success {
  @apply bg-green-400;
}

.status-info {
  @apply bg-blue-400;
}

.status-warning {
  @apply bg-yellow-400;
}

/* 빠른 액션 */
.quick-actions {
  @apply p-6 grid grid-cols-2 gap-4;
}

.action-button {
  @apply flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-2 hover:border-blue-300 hover:bg-blue-50 transition-colors;
}

.action-button i {
  @apply text-h4 text-gray-600 group-hover:text-blue-600;
}

.action-button span {
  @apply text-sm font-medium text-gray-700 group-hover:text-blue-700;
}
</style>
