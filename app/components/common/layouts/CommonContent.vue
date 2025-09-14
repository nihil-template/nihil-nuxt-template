<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
});

const cssVariants = cva([ 'flex', ], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});
</script>

<template>
  <div
    :class='cn(cssVariants({}), props.class)'
    v-bind='$attrs'
  >
    <aside class='hidden lg:block lg:w-64 p-4'>
      aside
    </aside>
    <main class='flex-1 p-4'>
      <slot />
    </main>
  </div>
</template>
