<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/cn';

interface Props
  extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  userNo: number;
  class?: string;
}

const cssVariants = cva(
  [
    'container mx-auto py-10',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const props = defineProps<Props>();

const { response: user, pending: loading, error, } = useGetUserByNo(props.userNo);
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    <div
      v-if='loading'
      class='animate-pulse space-y-4'
    >
      <div class='h-8 bg-muted rounded w-1/4' />
      <div class='h-4 bg-muted rounded w-1/2' />
      <div class='h-4 bg-muted rounded w-3/4' />
    </div>

    <div
      v-else-if='error || !user'
      class='text-center'
    >
      <p class='text-muted-foreground'>
        사용자 정보를 불러올 수 없습니다.
      </p>
    </div>

    <Card v-else>
      <CardHeader>
        <CardTitle>{{ user.data?.userNm }}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Email: {{ user.data?.emlAddr }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
