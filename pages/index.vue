<template>
  <div>index page</div>
</template>

<script setup lang="ts">
  useSiteMeta({
    title: '홈',
    url: '/',
  });

  const { data: categories, } = await useGet('categories', '/categories');
</script>

<style lang="scss" scoped></style>
