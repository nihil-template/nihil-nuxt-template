<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = defineProps<Props>();

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    content
  </div>
</template>

<style scoped>
/* NotShow 컴포넌트 스타일 */
</style>
