<script setup lang="ts">
definePageMeta({
  layout: 'users-layout',
});

const route = useRoute();
const userNo = computed(() => Number(route.params.userNo));

useSetMeta({
  title: `사용자 상세 - ${userNo.value}`,
  url: `/users/${userNo.value}`,
});
</script>

<template>
  <ClientOnly>
    <UserDetail :user-no='userNo' />
    <template #fallback>
      <div>
        <h1>사용자 상세</h1>
        <div class='loading-fallback'>
          <div class='spinner-fallback' />
          <p>사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

h1 {
  @apply text-h3 font-bold mb-6;
}

.loading-fallback {
  @apply flex items-center gap-3;
}

.spinner-fallback {
  @apply inline-block w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin;
}
</style>
