<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { useCacheStore } from '~/entities/common/cache.store';
import { cn } from '~/libs/cn';

const cssVariants = cva(
  [
    'container mx-auto px-4 py-8',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    class: '',
  });

// 자동 임포트로 인해 별도 import 불필요
const { session, pending: isPending, cacheKey, } = useGetSession();
const cacheStore = useCacheStore();

// 현재 시간을 반응형으로 만들기
const currentTime = ref(Date.now());

// 30초마다 현재 시간 업데이트 (더 정확한 실시간 표시)
let timeInterval: NodeJS.Timeout | null = null;

onMounted(() => {
  // 항상 현재 시간으로 시작 (잔여 시간 계산을 위해)
  currentTime.value = Date.now();

  timeInterval = setInterval(() => {
    // 30초마다 실제 현재 시간으로 업데이트 (정확한 실시간 표시)
    currentTime.value = Date.now();
  }, 30000);
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});

// 캐시 상태 표시를 위한 computed
const cacheInfo = computed(() => {
  // cacheKey가 문자열이므로 스토어 제공 메서드로 조회
  const cachedEntry = cacheStore.getEntry(cacheKey);

  if (cachedEntry) {
    const now = currentTime.value;
    const remainingMs = cachedEntry.expiresAt - now;
    const remainingMinutes = Math.max(0, Math.floor(remainingMs / (1000 * 60)));
    const remainingSeconds = Math.max(0, Math.floor((remainingMs % (1000 * 60)) / 1000));

    // 캐시 시작 시간 (responseTime 사용, 없으면 createdAt 사용)
    const cacheStartTime = cachedEntry.responseTime
      ? new Date(cachedEntry.responseTime).getTime()
      : cachedEntry.createdAt || (cachedEntry.expiresAt - 60 * 60 * 1000);

    // 시간 포맷팅 함수
    const formatTime = (timestamp: number) => {
      if (!timestamp || isNaN(timestamp)) {
        return 'Invalid Date';
      }
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    };

    return {
      cached: true,
      remainingMinutes: remainingMinutes > 0
        ? `${remainingMinutes}분 ${remainingSeconds}초`
        : '만료됨',
      remainingMinutesOnly: remainingMinutes,
      remainingSeconds,
      data: cachedEntry.value,
      expiresAt: cachedEntry.expiresAt,
      // 추가된 상세 시간 정보
      cacheStartTime,
      cacheStartTimeFormatted: formatTime(cacheStartTime),
      expiresAtFormatted: formatTime(cachedEntry.expiresAt),
      ttlMinutes: 60, // TTL은 60분으로 고정
      currentTimeFormatted: formatTime(now),
    };
  }

  return {
    cached: false,
    remainingMinutes: 0,
    data: null,
    expiresAt: null,
    cacheStartTime: null,
    cacheStartTimeFormatted: null,
    expiresAtFormatted: null,
    ttlMinutes: 0,
    currentTimeFormatted: null,
  };
});
</script>

<template>
  <div
    :class='cn(cssVariants({}), props.class)'
    v-bind='$attrs'
  >
    <ClientOnly>
      <div
        v-if='isPending'
        class='flex items-center justify-center min-h-[400px]'
      >
        <div class='text-center'>
          <div class='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4' />
          <p class='text-muted-foreground'>
            로딩 중...
          </p>
        </div>
      </div>

      <div
        v-else
        class='max-w-4xl mx-auto'
      >
        <div class='text-center mb-12'>
          <h1 class='text-4xl font-bold tracking-tight mb-4'>
            Nihil Turbo Fullstack Template
          </h1>
          <p class='text-xl text-muted-foreground mb-8'>
            Nuxt.js, NestJS, Drizzle, Vue Query를 활용한 풀스택 템플릿
          </p>

          <!-- 캐시 상태 디버깅 정보 -->
          <div class='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8 text-left text-sm'>
            <h3 class='font-semibold mb-2'>
              🔍 캐시 디버깅 정보
            </h3>
            <div class='space-y-1'>
              <p><strong>캐시 키:</strong> {{ cacheKey }}</p>
              <p><strong>캐시 상태:</strong> {{ cacheInfo.cached ? '✅ 캐시됨' : '❌ 캐시 없음' }}</p>

              <div v-if='cacheInfo.cached' class='mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border'>
                <h4 class='font-medium text-blue-800 dark:text-blue-200 mb-2'>
                  ⏰ 시간 정보
                </h4>
                <div class='space-y-1 text-xs'>
                  <p><strong>현재 시간:</strong> {{ cacheInfo.currentTimeFormatted }}</p>
                  <p><strong>캐시 시작:</strong> {{ cacheInfo.cacheStartTimeFormatted }}</p>
                  <p><strong>만료 시간:</strong> {{ cacheInfo.expiresAtFormatted }}</p>
                  <p><strong>유효 시간:</strong> {{ cacheInfo.ttlMinutes }}분</p>
                  <p><strong>잔여 시간:</strong> {{ cacheInfo.remainingMinutes }}</p>
                  <p class='text-blue-600 dark:text-blue-400'>
                    <strong>정확한 잔여:</strong> {{ cacheInfo.remainingMinutesOnly }}분 {{ cacheInfo.remainingSeconds }}초
                  </p>
                </div>
              </div>

              <p><strong>로딩 중:</strong> {{ isPending ? '✅ Yes' : '❌ No' }}</p>
              <p><strong>세션 데이터:</strong> {{ session ? '✅ 있음' : '❌ 없음' }}</p>
              <p class='text-green-600 dark:text-green-400'>
                <strong>캐시 상태:</strong>
                {{ cacheInfo.cached ? '✅ 캐시에서 로드됨 (API 요청 없음)' : '🔄 API에서 로드됨' }}
              </p>
              <details v-if='session' class='mt-2'>
                <summary class='cursor-pointer font-medium'>
                  ▶ 세션 데이터 보기
                </summary>
                <pre class='mt-2 text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded overflow-auto'>{{ JSON.stringify(session, null, 2) }}</pre>
              </details>
            </div>
          </div>
        </div>

        <Card class='mb-12'>
          <CardHeader>
            <CardTitle>시작 가이드</CardTitle>
            <CardDescription>
              이 템플릿을 사용하여 개발을 시작하는 방법입니다.
            </CardDescription>
          </CardHeader>
          <CardContent class='space-y-4'>
            <div>
              <h3 class='font-semibold'>
                1. 의존성 설치
              </h3>
              <p class='text-sm text-muted-foreground'>
                프로젝트 루트에서 다음 명령어를 실행하여 모든 의존성을 설치합니다.
              </p>
              <code class='block bg-muted p-2 rounded-md mt-2 text-sm'>
                pnpm install
              </code>
            </div>
            <div>
              <h3 class='font-semibold'>
                2. 데이터베이스 설정
              </h3>
              <p class='text-sm text-muted-foreground'>
                `apps/api/.env` 파일을 생성하고 데이터베이스 URL을 설정하세요.
              </p>
            </div>
            <div>
              <h3 class='font-semibold'>
                3. Drizzle 스키마 생성
              </h3>
              <p class='text-sm text-muted-foreground'>
                Drizzle 스키마를 기반으로 데이터베이스 클라이언트를 생성합니다.
              </p>
              <code class='block bg-muted p-2 rounded-md mt-2 text-sm'>
                pnpm db:generate --filter=api
              </code>
            </div>
            <div>
              <h3 class='font-semibold'>
                4. 데이터베이스 마이그레이션
              </h3>
              <p class='text-sm text-muted-foreground'>
                데이터베이스 스키마를 최신 상태로 마이그레이션합니다.
              </p>
              <code class='block bg-muted p-2 rounded-md mt-2 text-sm'>
                pnpm db:migrate --filter=api
              </code>
            </div>
            <div>
              <h3 class='font-semibold'>
                <span class='line-through'>
                  5. 최초 관리자 계정 생성
                </span>
              </h3>
              <p class='text-sm text-muted-foreground line-through'>
                개발용 최초 관리자 계정을 생성합니다. 계정 정보는
                <code class='text-xs'>
                  packages/config/server.config.ts
                </code>
                파일에서 수정할 수 있습니다.
              </p>
              <code class='block bg-muted p-2 rounded-md mt-2 text-sm line-through'>
                pnpm --filter=api exec prisma db seed
              </code>
              <p class='text-sm text-muted-foreground mt-2'>
                <strong>현재 시딩 기능이 구현되지 않았습니다.</strong>
              </p>
            </div>
            <div>
              <h3 class='font-semibold'>
                6. 개발 서버 실행
              </h3>
              <p class='text-sm text-muted-foreground'>
                프론트엔드와 백엔드 개발 서버를 동시에 시작합니다.
              </p>
              <code class='block bg-muted p-2 rounded-md mt-2 text-sm'>
                pnpm dev
              </code>
            </div>
          </CardContent>
        </Card>

        <div
          v-if='session?.data'
          class='grid gap-6 md:grid-cols-2'
        >
          <!-- 로그인된 사용자를 위한 콘텐츠 -->
          <Card>
            <CardHeader>
              <CardTitle>환영합니다!</CardTitle>
              <CardDescription>
                {{ session.data?.userNm || session.data?.emlAddr }}님, 안녕하세요!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                as-child
                class='w-full'
              >
                <NuxtLink to='/profile'>
                  마이페이지
                </NuxtLink>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>사용자 관리</CardTitle>
              <CardDescription>
                전체 사용자 목록을 확인하고 관리하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                as-child
                variant='outline'
                class='w-full'
              >
                <NuxtLink to='/users'>
                  사용자 목록
                </NuxtLink>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div
          v-else
          class='grid gap-6 md:grid-cols-2'
        >
          <!-- 비로그인 사용자를 위한 콘텐츠 -->
          <Card>
            <CardHeader>
              <CardTitle>시작하기</CardTitle>
              <CardDescription>
                계정을 만들고 모든 기능을 사용해보세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                as-child
                class='w-full'
              >
                <NuxtLink to='/auth/signup'>
                  회원가입
                </NuxtLink>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>이미 계정이 있나요?</CardTitle>
              <CardDescription>
                로그인하여 개인화된 경험을 즐기세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                as-child
                variant='outline'
                class='w-full'
              >
                <NuxtLink to='/auth/signin'>
                  로그인
                </NuxtLink>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div class='mt-16 text-center'>
          <h2 class='text-2xl font-semibold mb-6'>
            주요 기능
          </h2>
          <div class='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div class='p-4 border rounded-lg'>
              <h3 class='font-medium mb-2'>
                Nuxt.js
              </h3>
              <p class='text-sm text-muted-foreground'>
                Vue 기반 풀스택 프레임워크
              </p>
            </div>
            <div class='p-4 border rounded-lg'>
              <h3 class='font-medium mb-2'>
                NestJS
              </h3>
              <p class='text-sm text-muted-foreground'>
                강력한 백엔드 프레임워크
              </p>
            </div>
            <div class='p-4 border rounded-lg'>
              <h3 class='font-medium mb-2'>
                Drizzle
              </h3>
              <p class='text-sm text-muted-foreground'>
                타입 안전한 데이터베이스 ORM
              </p>
            </div>
            <div class='p-4 border rounded-lg'>
              <h3 class='font-medium mb-2'>
                Vue Query
              </h3>
              <p class='text-sm text-muted-foreground'>
                효율적인 서버 상태 관리
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
