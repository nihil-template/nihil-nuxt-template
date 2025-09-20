<script setup lang="ts">

import type { UserInfoType } from '~/schemas/user.schema';

const searchResult = ref<UserInfoType | null>(null);
const isSearchMode = ref(false);

const { response: users, pending, error, trigger } = useGetUsers();
const router = useRouter();

const clearSearch = () => {
  searchResult.value = null;
  isSearchMode.value = false;
};

const usersList = computed(() => {
  if (searchResult.value) {
    return [searchResult.value];
  }
  return users.value?.data?.list ?? [];
});

const totalCnt = computed(() => {
  if (searchResult.value) {
    return 1;
  }
  return users.value?.data?.totalCnt ?? 0;
});

const handleSearchResult = (user: UserInfoType | null) => {
  if (user) {
    searchResult.value = user;
    isSearchMode.value = true;
  }
  else {
    searchResult.value = null;
    isSearchMode.value = false;
  }
};

const handleClearSearch = () => {
  clearSearch();
};

const columns = [
  { field: 'userNo', header: '번호', sortable: true },
  { field: 'emlAddr', header: '이메일', sortable: true },
  { field: 'userNm', header: '사용자명', sortable: true },
  { field: 'userRole', header: '권한', sortable: true },
  { field: 'lastLgnDt', header: '마지막 로그인', sortable: true },
  { field: 'userBiogp', header: '자기소개', sortable: false },
];

const formatDate = (date: string | null) => {
  if (!date) return '-';
  return new Date(date).toLocaleString('ko-KR');
};

const formatRole = (role: string) => {
  return role === 'ADMIN' ? '관리자' : '일반 사용자';
};

const formatValue = (data: UserInfoType, field: string) => {
  switch (field) {
    case 'userRole':
      return formatRole(data[field as keyof UserInfoType] as string);
    case 'lastLgnDt':
      return formatDate(data[field as keyof UserInfoType] as string | null);
    case 'userBiogp':
      return (data[field as keyof UserInfoType] as string | null) || '-';
    default:
      return data[field as keyof UserInfoType];
  }
};

onMounted(() => {
  trigger();
});
</script>

<template>
  <div>
    <div class='header-section'>
      <h1>사용자 목록</h1>

      <UserSearch
        @search-result='handleSearchResult'
        @clear-search='handleClearSearch'
      />

      <div v-if='searchResult' class='search-info'>
        <Tag value='검색 결과' severity='info' />
        <span>검색된 결과</span>
      </div>
    </div>

    <div v-if='pending'>
      <ProgressSpinner />
      <p>사용자 목록을 불러오는 중...</p>
    </div>

    <div v-else-if='error'>
      <Message severity='error' :closable='false'>
        사용자 목록을 불러오는데 실패했습니다.
      </Message>
    </div>

    <div v-else-if='usersList'>
      <DataTable
        :value='usersList'
        :paginator='true'
        :rows='10'
        :rows-per-page-options='[5, 10, 20, 50]'
        responsive-layout='scroll'
        :global-filter-fields="['emlAddr', 'userNm', 'userRole']"
      >
        <template #header>
          <div>
            <h2>총 {{ totalCnt }}명의 사용자</h2>
          </div>
        </template>

        <Column
          v-for='column in columns'
          :key='column.field'
          :field='column.field'
          :header='column.header'
          :sortable='column.sortable'
        >
          <template #body='{ data }'>
            <NuxtLink
              v-if="column.field === 'userNo'"
              :to='`/users/${data.userNo}`'
              class='user-link'
            >
              {{ formatValue(data, column.field) }}
            </NuxtLink>
            <NuxtLink
              v-else-if="column.field === 'userNm'"
              :to='`/users/${data.userNo}`'
              class='user-link'
            >
              {{ formatValue(data, column.field) }}
            </NuxtLink>
            <Tag
              v-else-if="column.field === 'userRole'"
              :value='formatValue(data, column.field)'
              :severity="data.userRole === 'ADMIN' ? 'danger' : 'info'"
            />
            <span v-else>
              {{ formatValue(data, column.field) }}
            </span>
          </template>
        </Column>

        <Column header='작업' :sortable='false'>
          <template #body='{ data }'>
            <div class='actions'>
              <Button
                icon='pi pi-eye'
                severity='info'
                size='small'
                @click='() => router.push(`/users/${data.userNo}`)'
                v-tooltip.top="'상세보기'"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <div v-else>
      <Message severity='info' :closable='false'>
        등록된 사용자가 없습니다.
      </Message>
    </div>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.header-section {
  @apply mb-6;
}

h1 {
  @apply text-h3 font-bold mb-4;
}

h2 {
  @apply text-h4 font-semibold;
}

.search-info {
  @apply flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-px;
}

.search-info span {
  @apply text-blue-800 text-sm;
}

div:first-child {
  @apply w-full;
}

.user-link {
  @apply text-blue-600 hover:text-blue-800 hover:underline cursor-pointer;
}

.actions {
  @apply flex gap-2;
}

</style>
