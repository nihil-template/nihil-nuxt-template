<template>
  <div>keywords page</div>
</template>

<script setup lang="ts">
  const route = useRoute();

  console.log(route.params);

  useSiteMeta({
    title: '키워드',
    url: '/keywords/category/' + route.params.categoryId,
  });
</script>

<style lang="scss" scoped></style>
