<script setup lang="ts">
import { Button } from '~/components/common/ui/button';
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
  <Button
    :type='type'
    :disabled='disabled || loading'
    :class="cn('w-full min-h-[40px] cursor-pointer mt-6', props.class)"
  >
    <slot />
  </Button>
</template>
