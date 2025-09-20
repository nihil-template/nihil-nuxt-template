<script setup lang="ts">
// 메인 콘텐츠 영역 - aside와 main을 포함하는 컨테이너
</script>

<template>
  <div class="content-container">
    <CommonAside />
    <CommonMain>
      <slot />
    </CommonMain>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.content-container {
  @apply flex flex-1 min-h-0;
}
</style>