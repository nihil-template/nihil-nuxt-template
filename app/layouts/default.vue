<script setup lang="ts">
// 기본 레이아웃 - common 그룹에만 적용
</script>

<template>
  <div class='min-h-dvh-100 bg-background text-foreground flex flex-col'>
    <CommonLayout>
      <slot />
    </CommonLayout>
  </div>
</template>
