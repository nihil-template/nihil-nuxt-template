<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '~/components/common/ui/button';
import { Card, CardContent, CardHeader } from '~/components/common/ui/card';
import { cn } from '~/libs/utils';

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
const { session, pending: isPending, } = useGetSession();
</script>

<template>
  <!-- 로딩 상태 -->
  <div
    v-if='isPending'
    :class='cn(cssVariants({}), props.class)'
  >
    <div class='container mx-auto px-4 py-8'>
      <div class='flex justify-center'>
        <Card class='w-full max-w-2xl'>
          <CardContent class='p-6'>
            <div class='animate-pulse space-y-4'>
              <div class='h-4 bg-muted rounded w-1/4' />
              <div class='h-4 bg-muted rounded w-1/2' />
              <div class='h-4 bg-muted rounded w-3/4' />
            </div>
          </CardContent>
        </Card>
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
        <Card class='w-full max-w-md'>
          <CardHeader>
            <h1 class='text-xl font-semibold text-center'>
              접근 제한
            </h1>
          </CardHeader>
          <CardContent class='text-center space-y-4'>
            <p class='text-muted-foreground'>
              이 페이지에 접근하려면 로그인이 필요합니다.
            </p>
            <Button as-child>
              <NuxtLink to='/auth/signin'>
                로그인하기
              </NuxtLink>
            </Button>
          </CardContent>
        </Card>
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
        <Card class='w-full max-w-2xl'>
          <CardHeader>
            <div class='flex items-center justify-between'>
              <h1 class='text-xl font-semibold'>
                마이페이지
              </h1>
              <Button
                variant='outline'
                size='sm'
                as-child
              >
                <NuxtLink to='/'>
                  홈으로
                </NuxtLink>
              </Button>
            </div>
          </CardHeader>
          <CardContent class='p-6'>
            <slot />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
