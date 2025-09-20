<script setup lang="ts">

interface Props {
  userNo: number;
}

const props = defineProps<Props>();

const { response: userResponse, pending, error } = useGetUserByNo(props.userNo);

const user = computed(() => {
  return userResponse.value?.data ?? null;
});

const formatDate = (date: string | null) => {
  if (!date) return '-';
  return new Date(date).toLocaleString('ko-KR');
};

const formatRole = (role: string) => {
  return role === 'ADMIN' ? '관리자' : '일반 사용자';
};

const goBack = () => {
  navigateTo('/users');
};
</script>

<template>
  <div>
    <div class='header-section'>
      <Button
        icon='pi pi-arrow-left'
        label='목록으로'
        severity='secondary'
        @click='goBack'
      />
      <h1>사용자 상세</h1>
    </div>

    <div v-if='pending'>
      <ProgressSpinner />
      <p>사용자 정보를 불러오는 중...</p>
    </div>

    <div v-else-if='error'>
      <Message severity='error' :closable='false'>
        사용자 정보를 불러오는데 실패했습니다.
      </Message>
    </div>

    <div v-else-if='user'>
      <Card>
        <template #title>
          <div class='user-title'>
            <Avatar
              :label='user.userNm.charAt(0)'
              size='xlarge'
              shape='circle'
            />
            <div>
              <h2>{{ user.userNm }}</h2>
              <Tag
                :value='formatRole(user.userRole)'
                :severity="user.userRole === 'ADMIN' ? 'danger' : 'info'"
              />
            </div>
          </div>
        </template>

        <template #content>
          <div class='user-info'>
            <div class='info-row'>
              <strong>사용자 번호:</strong>
              <span>{{ user.userNo }}</span>
            </div>

            <div class='info-row'>
              <strong>이메일:</strong>
              <span>{{ user.emlAddr }}</span>
            </div>

            <div class='info-row'>
              <strong>사용자명:</strong>
              <span>{{ user.userNm }}</span>
            </div>

            <div class='info-row'>
              <strong>권한:</strong>
              <Tag
                :value='formatRole(user.userRole)'
                :severity="user.userRole === 'ADMIN' ? 'danger' : 'info'"
              />
            </div>

            <div v-if='user.userBiogp' class='info-row'>
              <strong>자기소개:</strong>
              <span>{{ user.userBiogp }}</span>
            </div>

            <div v-if='user.lastLgnDt' class='info-row'>
              <strong>마지막 로그인:</strong>
              <span>{{ formatDate(user.lastLgnDt) }}</span>
            </div>
          </div>
        </template>

        <template #footer>
          <div class='actions'>
            <Button
              label='목록으로 돌아가기'
              icon='pi pi-list'
              @click='goBack'
            />
          </div>
        </template>
      </Card>
    </div>

    <div v-else>
      <Message severity='info' :closable='false'>
        사용자를 찾을 수 없습니다.
      </Message>
    </div>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.header-section {
  @apply flex items-center gap-4 mb-6;
}

h1 {
  @apply text-h3 font-bold;
}

.user-title {
  @apply flex items-center gap-4;
}

.user-title h2 {
  @apply text-h4 font-semibold mb-2;
}

.user-info {
  @apply space-y-4;
}

.info-row {
  @apply flex gap-4 items-start;
}

.info-row strong {
  @apply min-w-32 text-gray-600 font-medium;
}

.info-row span {
  @apply text-gray-900 flex-1;
}

.actions {
  @apply flex justify-end;
}

div:first-child {
  @apply w-full;
}
</style>
