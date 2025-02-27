<template>
  <div>keywords page</div>
</template>

<script setup lang="ts">
  const route = useRoute();

  useSiteMeta({
    title: '키워드',
    url: `/keywords/category/${route.params.categoryId}`,
  });
</script>

<style lang="scss" scoped></style>
