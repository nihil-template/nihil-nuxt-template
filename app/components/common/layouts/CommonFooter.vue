<script setup lang="ts">
import { webConfig } from '@repo/config/web.config';

import { cn } from '~/libs/cn';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <footer :class="cn('border-t border-border bg-background/95', $attrs.class as string)">
    <div class='container mx-auto px-4 py-8'>
      <div class='text-center text-sm text-muted-foreground'>
        <p>&copy; 2024 {{ webConfig.title }}. All rights reserved.</p>
        <p class='mt-2'>
          Version: {{ webConfig.version }}
        </p>
      </div>
    </div>
  </footer>
</template>
