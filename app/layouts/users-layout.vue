<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

interface Props
  extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const cssVariants = cva(
  [
    'min-h-screen bg-background',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        card: 'bg-card',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
    compoundVariants: [],
  }
);

const props = withDefaults(defineProps<Props>(), {
  class: '',
});
</script>

<template>
  <div
    :class='cn(cssVariants({}), props.class)'
  >
    <!-- 헤더 영역 -->
    <header class='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div class='container mx-auto px-4 py-4'>
        <div class='flex items-center justify-between'>
          <div class='flex items-center space-x-4'>
            <h1 class='text-h4 font-semibold'>
              사용자 관리
            </h1>
          </div>
          <div class='flex items-center space-x-2'>
            <Button as-child variant='outline' size='sm'>
              <NuxtLink to='/'>
                <svg
                  class='mr-2 h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  />
                </svg>
                홈으로
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 영역 -->
    <main class='container mx-auto px-4 py-6'>
      <slot />
    </main>
  </div>
</template>
