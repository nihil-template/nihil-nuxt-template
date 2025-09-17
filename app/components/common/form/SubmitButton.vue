<script setup lang="ts">
import { cn } from '~/libs/cn';

interface Props {
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit' | 'button' | 'reset';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
  type: 'submit',
});

defineSlots<{
  default(): any;
}>();
</script>

<template>
  <button
    :type='type'
    :disabled='disabled || loading'
    :class="cn('w-full min-h-[40px] cursor-pointer mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed', props.class)"
  >
    <slot />
  </button>
</template>
