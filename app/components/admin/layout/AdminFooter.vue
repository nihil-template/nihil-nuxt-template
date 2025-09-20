<script setup lang="ts">
// 관리자 푸터 - 관리자 대시보드 하단 정보
</script>

<template>
  <footer>
    <div class='footer-content'>
      <span>© 2025 관리자 대시보드. All rights reserved.</span>
      <span class='version'>
        v1.0.0
      </span>
    </div>
  </footer>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

footer {
  @apply bg-white border-t border-gray-200 p-4;
}

.footer-content {
  @apply flex items-center justify-between text-sm text-gray-600;
}

.version {
  @apply bg-gray-100 px-2 py-1 rounded-2 text-xs font-mono;
}
</style>
