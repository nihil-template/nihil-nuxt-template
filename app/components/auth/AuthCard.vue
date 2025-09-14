<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthCardStore } from '~/entities/auth/auth-card.store';

const authCardStore = useAuthCardStore();
const { authCardHeader, } = storeToRefs(authCardStore);

// 자동 임포트된 훅 사용
const { session, pending: loading, } = useGetSession();
</script>

<template>
  <div v-if='!loading && session?.data'>
    <NotShow>
      <slot />
    </NotShow>
  </div>
  <Card
    v-else
    class='flex dvh-90 flex-col !py-0 !pb-6 w-[600px]'
  >
    <CardHeader class='px-6 pt-6'>
      <AppLogo />
      <div
        v-if='authCardHeader.title'
        class='mt-6 text-left space-y-2'
      >
        <h2 class='text-h4 font-bold text-foreground leading-tight'>
          {{ authCardHeader.title }}
        </h2>
        <p
          v-if='authCardHeader.description'
          class='text-md text-muted-foreground leading-relaxed'
        >
          {{ authCardHeader.description }}
        </p>
      </div>
      <div
        v-if='authCardHeader.title'
        class='mt-6 border-t border-border'
      />
    </CardHeader>

    <CardContent class='flex-1 overflow-y-auto flex flex-col px-6'>
      <slot />
    </CardContent>
  </Card>
</template>

<style scoped>
/* AuthCard 컴포넌트 스타일 */
</style>
