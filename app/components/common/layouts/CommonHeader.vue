<script setup lang="ts">
import { cn } from '~/libs/cn';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <header :class="cn('flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6', $attrs.class as string)">
    <NuxtLink
      to='/'
      class='flex items-center gap-2'
    >
      <div class='flex items-center gap-2'>
        <div class='h-8 w-8 rounded-lg bg-primary flex items-center justify-center'>
          <span class='text-primary-foreground font-bold text-sm'>
            N
          </span>
        </div>
        <span class='font-bold text-lg text-foreground'>
          Nihil Turbo
        </span>
      </div>
    </NuxtLink>
    <AuthButtons />
  </header>
</template>
