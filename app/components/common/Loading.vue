<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

const loadingVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        muted: 'text-muted-foreground',
      },
      size: {
        default: 'h-6 w-6',
        sm: 'h-4 w-4',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      fullScreen: {
        true: 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullScreen: false,
    },
  }
);

interface LoadingProps extends /* @vue-ignore */ VariantProps<typeof loadingVariants> {
  text?: string;
  showSpinner?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<LoadingProps>(), {
  text: '',
  showSpinner: true,
  class: '',
});
</script>

<template>
  <div
    :class="cn(loadingVariants({
      variant,
      size: fullScreen ? 'xl' : size,
      fullScreen,
    }), props.class)"
    v-bind='$attrs'
  >
    <div class='flex flex-col items-center gap-2'>
      <div
        v-if='showSpinner'
        class='animate-spin'
      >
        <Icon
          name='lucide:loader-2'
          :class="cn(
            'animate-spin',
            fullScreen
              ? 'h-12 w-12'
              : size === 'sm'
                ? 'h-4 w-4'
                : size === 'lg'
                  ? 'h-8 w-8'
                  : 'h-6 w-6'
          )"
        />
      </div>
      <p
        v-if='text'
        :class="cn(
          'text-center font-medium',
          fullScreen ? 'text-lg' : 'text-sm'
        )"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>
