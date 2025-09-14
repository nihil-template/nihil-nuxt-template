<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

interface Props
  extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const cssVariants = cva(
  [
    'container mx-auto py-10 space-y-6',
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
    <h1 class='text-2xl font-bold mb-4'>
      Users
    </h1>

    <div>
      <h2 class='text-xl font-semibold mb-4'>
        전체 사용자 목록
      </h2>
      <UserList />
    </div>
  </div>
</template>
