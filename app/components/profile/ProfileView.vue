<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
});

const cssVariants = cva([
  'space-y-6',
], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

// 세션 상태 확인 (자동 임포트)
const { session, pending: isPending, } = useGetSession();
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    <!-- 로딩 상태 -->
    <div
      v-if='isPending'
      class='animate-pulse space-y-4'
    >
      <div class='h-4 bg-muted rounded w-1/4' />
      <div class='h-4 bg-muted rounded w-1/2' />
      <div class='h-4 bg-muted rounded w-3/4' />
    </div>

    <!-- 세션 없음 -->
    <p
      v-else-if='!session?.data'
      class='text-center text-muted-foreground'
    >
      세션 정보를 불러올 수 없습니다.
    </p>

    <!-- 사용자 정보 표시 -->
    <template v-else>
      <!-- 사용자 정보 카드 -->
      <Card>
        <CardHeader>
          <CardTitle>사용자 정보</CardTitle>
        </CardHeader>
        <CardContent class='space-y-4'>
          <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p class='text-sm font-medium text-muted-foreground'>
                이름
              </p>
              <p class='text-lg font-semibold'>
                {{ session.data.userNm || '미설정' }}
              </p>
            </div>
            <div>
              <p class='text-sm font-medium text-muted-foreground'>
                이메일
              </p>
              <p class='text-lg font-semibold'>
                {{ session.data.emlAddr }}
              </p>
            </div>
            <div>
              <p class='text-sm font-medium text-muted-foreground'>
                역할
              </p>
              <p class='text-lg font-semibold'>
                {{ session.data.userRole || '사용자' }}
              </p>
            </div>
            <div>
              <p class='text-sm font-medium text-muted-foreground'>
                가입일
              </p>
              <p class='text-lg font-semibold'>
                {{ session.data.crtDt
                  ? new Date(session.data.crtDt).toLocaleDateString('ko-KR')
                  : '알 수 없음' }}
              </p>
            </div>
          </div>

          <!-- 자기소개 -->
          <div
            v-if='session.data.userBiogp'
            class='mt-4'
          >
            <p class='text-sm font-medium text-muted-foreground'>
              자기소개
            </p>
            <p class='text-base mt-1 p-3 bg-muted/50 rounded-md'>
              {{ session.data.userBiogp }}
            </p>
          </div>

          <!-- 프로필 이미지 -->
          <div
            v-if='session.data.proflImg'
            class='mt-4'
          >
            <p class='text-sm font-medium text-muted-foreground'>
              프로필 이미지
            </p>
            <div class='mt-2'>
              <img
                :src='session.data.proflImg'
                alt='프로필 이미지'
                class='w-24 h-24 rounded-full object-cover border'
              >
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <!-- 프로필 관리 링크 -->
      <Card>
        <CardHeader>
          <CardTitle>계정 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Button
              variant='outline'
              as-child
              class='h-auto p-4 flex flex-col items-start gap-2'
            >
              <NuxtLink to='/profile/edit'>
                <div class='font-semibold'>
                  프로필 수정
                </div>
                <div class='text-sm text-muted-foreground'>
                  이름, 이메일 등 기본 정보를 수정합니다
                </div>
              </NuxtLink>
            </Button>

            <Button
              variant='outline'
              as-child
              class='h-auto p-4 flex flex-col items-start gap-2'
            >
              <NuxtLink to='/profile/edit/change-password'>
                <div class='font-semibold'>
                  비밀번호 변경
                </div>
                <div class='text-sm text-muted-foreground'>
                  계정 보안을 위해 비밀번호를 변경합니다
                </div>
              </NuxtLink>
            </Button>

            <Button
              variant='outline'
              as-child
              class='h-auto p-4 flex flex-col items-start gap-2'
            >
              <NuxtLink to='/profile/withdraw'>
                <div class='font-semibold text-destructive'>
                  회원 탈퇴
                </div>
                <div class='text-sm text-muted-foreground'>
                  계정을 영구적으로 삭제합니다
                </div>
              </NuxtLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
