<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

interface Props
  extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const cssVariants = cva(
  [
    'container mx-auto py-10',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const props = withDefaults(defineProps<Props>(), {
  class: '',
});
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    <Card>
      <CardHeader>
        <CardTitle>관리자 대시보드</CardTitle>
        <CardDescription>
          시스템 관리 및 사용자 관리를 위한 관리자 전용 페이지입니다.
        </CardDescription>
      </CardHeader>
      <CardContent class='space-y-4'>
        <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <NuxtLink
            to='/users'
            class='block p-4 border rounded-lg hover:bg-accent transition-colors'
          >
            <h3 class='font-semibold mb-2'>
              사용자 관리
            </h3>
            <p class='text-sm text-muted-foreground'>
              전체 사용자 목록을 확인하고 관리합니다.
            </p>
          </NuxtLink>

          <NuxtLink
            to='/admin/signup'
            class='block p-4 border rounded-lg hover:bg-accent transition-colors'
          >
            <h3 class='font-semibold mb-2'>
              관리자 계정 생성
            </h3>
            <p class='text-sm text-muted-foreground'>
              새로운 관리자 계정을 생성합니다.
            </p>
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
