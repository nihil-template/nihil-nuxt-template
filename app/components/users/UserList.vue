<script setup lang="ts">
import { searchUserSchema, type SearchUserType } from '@repo/drizzle';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { userColumns } from '~/components/users/columns';

const pagination = ref({ pageIndex: 0, pageSize: 10, });
const route = useRoute();

// URL 쿼리 파라미터에서 초기값 가져오기
const getInitialValues = (): SearchUserType => ({
  strtRow: 0,
  endRow: 10,
  srchType: (route.query.srchType as 'emlAddr' | 'userNm') || 'userNm',
  srchKywd: (route.query.srchKywd as string) || '',
});

// 검색 폼 - vee-validate로 통일
const searchForm = useForm<SearchUserType>({
  validationSchema: toTypedSchema(searchUserSchema),
  initialValues: getInitialValues(),
});

const {
  response: users,
  trigger: searchUsers,
  pending: loading,
  error: searchError,
} = useGetUsers({});

// 검색 실행 함수 - 폼 데이터 직접 사용
const executeSearch = () => {
  const formValues = searchForm.values;
  const searchParams: SearchUserType = {
    strtRow: pagination.value.pageIndex * pagination.value.pageSize,
    endRow: pagination.value.pageSize,
    srchType: formValues.srchType || 'userNm',
    srchKywd: formValues.srchKywd || '',
  };

  searchUsers(searchParams);
};

// 검색 실행 함수 - 폼 제출 시
const handleSearch = () => {
  // 페이지를 첫 페이지로 리셋
  pagination.value = { pageIndex: 0, pageSize: pagination.value.pageSize, };

  // 실제 검색 실행
  executeSearch();
};

// 페이지네이션이 변경될 때마다 현재 검색 조건으로 다시 검색
watch([ () => pagination.value.pageIndex, () => pagination.value.pageSize, ], () => {
  executeSearch();
}, { immediate: true, });

// API 응답에서 list와 totalCnt 추출
const userList = computed(() => users.value?.data?.list || []);
const total = computed(() => users.value?.data?.totalCnt || 0);

const pageCount = computed(() => total.value
  ? Math.ceil(total.value / pagination.value.pageSize)
  : 0);

// 클라이언트 사이드 필터링 제거 - 서버 검색으로 통일

// 페이지네이션 표시용 계산된 값
const visiblePages = computed(() => {
  const currentPage = pagination.value.pageIndex + 1;
  const totalPages = pageCount.value;
  const visibleCount = 5; // 표시할 페이지 수

  if (totalPages <= visibleCount) {
    return Array.from({ length: totalPages, }, (_, i) => i + 1);
  }

  const start = Math.max(1, Math.min(currentPage - Math.floor(visibleCount / 2), totalPages - visibleCount + 1));
  const end = Math.min(totalPages, start + visibleCount - 1);

  return Array.from({ length: end - start + 1, }, (_, i) => start + i);
});

</script>

<template>
  <ClientOnly>
    <div class='space-y-4'>
      <!-- 검색 폼 -->
      <div class='p-4 border rounded-lg bg-card'>
        <h3 class='text-lg font-semibold mb-4'>
          사용자 검색
        </h3>
        <Form :form='searchForm'>
          <form
            class='flex gap-4 items-end'
            @submit='searchForm.handleSubmit(handleSearch)'
          >
            <div class='flex-1'>
              <FormInput
                :form='searchForm'
                name='srchKywd'
                label='검색어'
                placeholder='검색할 내용을 입력하세요'
                type='text'
              />
            </div>
            <div class='w-32'>
              <FormField
                #default='{ field }'
                name='srchType'
              >
                <FormItem>
                  <FormLabel>검색 타입</FormLabel>
                  <Select
                    v-bind='field'
                    @update:model-value='field.onChange'
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='검색 타입' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='userNm'>
                        사용자명
                      </SelectItem>
                      <SelectItem value='emlAddr'>
                        이메일
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div>
              <SubmitButton
                :is-pending='loading'
                :disabled='!searchForm.meta.value.valid'
              >
                검색
              </SubmitButton>
            </div>
          </form>
        </Form>
      </div>

      <!-- 사용자 목록 테이블 -->
      <div class='w-full space-y-4'>
        <!-- 로딩 상태 -->
        <div
          v-if='loading'
          class='flex items-center justify-center py-8'
        >
          <div class='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
          <span class='ml-3'>
            사용자 목록을 불러오는 중...
          </span>
        </div>

        <!-- 에러 상태 -->
        <div
          v-else-if='searchError'
          class='flex items-center justify-center py-8 text-destructive'
        >
          <span>사용자 목록을 불러오는 중 오류가 발생했습니다.</span>
        </div>

        <!-- 데이터가 있을 때 -->
        <div v-else-if='userList.length > 0'>
          <!-- 테이블 -->
          <div class='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    v-for='col in userColumns'
                    :key='String(col.key)'
                    :class='col.widthClass'
                  >
                    {{ col.header }}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for='row in userList'
                  :key='row.userNo'
                >
                  <TableCell>{{ row.userNo }}</TableCell>
                  <TableCell class='font-medium'>
                    {{ row.userNm }}
                  </TableCell>
                  <TableCell>{{ row.emlAddr }}</TableCell>
                  <TableCell>
                    <Button
                      variant='ghost'
                      size='sm'
                      @click='navigateTo(`/users/${row.userNo}`)'
                    >
                      상세보기
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- 페이지네이션 -->
          <div class='flex items-center justify-between'>
            <div class='flex items-center gap-2 text-sm text-muted-foreground'>
              <span>총 {{ total }}건</span>
              <span>•</span>
              <span>페이지 {{ pagination.pageIndex + 1 }} / {{ pageCount }}</span>
              <span>•</span>
              <span>페이지당 {{ pagination.pageSize }}건</span>
            </div>

            <div class='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                :disabled='pagination.pageIndex === 0'
                @click='pagination.pageIndex = Math.max(0, pagination.pageIndex - 1)'
              >
                이전
              </Button>

              <div class='flex items-center gap-1'>
                <Button
                  v-for='page in visiblePages'
                  :key='page'
                  variant='ghost'
                  size='sm'
                  :class='{
                    "bg-primary text-primary-foreground": page === pagination.pageIndex + 1
                  }'
                  @click='pagination.pageIndex = page - 1'
                >
                  {{ page }}
                </Button>
              </div>

              <Button
                variant='outline'
                size='sm'
                :disabled='(pagination.pageIndex + 1) >= pageCount'
                @click='pagination.pageIndex = Math.min(pageCount - 1, pagination.pageIndex + 1)'
              >
                다음
              </Button>
            </div>
          </div>
        </div>

        <!-- 데이터가 없을 때 -->
        <div
          v-else
          class='flex flex-col items-center justify-center py-12 text-center'
        >
          <div class='text-muted-foreground mb-2'>
            검색 결과가 없습니다
          </div>
          <div class='text-sm text-muted-foreground'>
            다른 검색어로 다시 시도해보세요
          </div>
        </div>
      </div>
    </div>
    <template #fallback>
      <div class='space-y-4'>
        <!-- 로딩 스켈레톤 -->
        <div class='p-4 border rounded-lg bg-card'>
          <div class='h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse' />
          <div class='flex gap-4 items-end'>
            <div class='flex-1'>
              <div class='h-10 bg-gray-200 rounded animate-pulse' />
            </div>
            <div class='w-32'>
              <div class='h-10 bg-gray-200 rounded animate-pulse' />
            </div>
            <div>
              <div class='h-10 w-20 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
        </div>
        <div class='w-full space-y-4'>
          <div class='flex items-center justify-center py-8'>
            <div class='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
            <span class='ml-3'>
              로딩 중...
            </span>
          </div>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
