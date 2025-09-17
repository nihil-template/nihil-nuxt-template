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
  'min-h-screen bg-muted/40',
], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

// 세션 상태 확인 (자동 임포트)
const { session, pending: isPending } = useGetSession();
</script>

<template>
  <!-- 로딩 상태 -->
  <div
    v-if='isPending'
    :class='cn(cssVariants({}), props.class)'
  >
    <div class='container mx-auto px-4 py-8'>
      <div class='flex justify-center'>
        <div class='w-full max-w-2xl bg-white rounded-lg shadow-sm border'>
          <div class='p-6'>
            <div class='animate-pulse space-y-4'>
              <div class='h-4 bg-gray-200 rounded w-1/4' />
              <div class='h-4 bg-gray-200 rounded w-1/2' />
              <div class='h-4 bg-gray-200 rounded w-3/4' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 인증되지 않은 상태 -->
  <div
    v-else-if='!session'
    :class='cn(cssVariants({}), props.class)'
  >
    <div class='container mx-auto px-4 py-8'>
      <div class='flex justify-center'>
        <div class='w-full max-w-md bg-white rounded-lg shadow-sm border'>
          <div class='p-6 border-b'>
            <h1 class='text-xl font-semibold text-center'>
              접근 제한
            </h1>
          </div>
          <div class='p-6 text-center space-y-4'>
            <p class='text-gray-600'>
              이 페이지에 접근하려면 로그인이 필요합니다.
            </p>
            <NuxtLink
              to='/auth/signin'
              class='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90'
            >
              로그인하기
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 인증된 상태 -->
  <div
    v-else
    :class='cn(cssVariants({}), props.class)'
  >
    <div class='container mx-auto px-4 py-8'>
      <div class='flex justify-center'>
        <div class='w-full max-w-2xl bg-white rounded-lg shadow-sm border'>
          <div class='p-6 border-b'>
            <div class='flex items-center justify-between'>
              <h1 class='text-xl font-semibold'>
                마이페이지
              </h1>
              <NuxtLink
                to='/'
                class='inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50'
              >
                홈으로
              </NuxtLink>
            </div>
          </div>
          <div class='p-6'>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
