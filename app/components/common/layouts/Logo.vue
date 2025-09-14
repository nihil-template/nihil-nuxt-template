<script setup lang="ts">
import { webConfig } from '@repo/config/web.config';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  href: '/',
});

const cssVariants = cva([ '', ], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

// 다크 모드 상태 (Nuxt의 useColorMode 사용)
const colorMode = useColorMode();
const isDarkMode = computed(() => colorMode.value === 'dark');
</script>

<template>
  <NuxtLink
    :to='href'
    :class='cn(cssVariants({}), props.class)'
    v-bind='$attrs'
  >
    <img
      :src='isDarkMode ? webConfig.darkLogo : webConfig.logo'
      alt='nihilapps logo'
      width='50'
      height='50'
      class='w-[50px] h-[50px]'
    >
  </NuxtLink>
</template>
