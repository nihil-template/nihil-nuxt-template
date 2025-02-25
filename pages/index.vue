<template>
  <div>index content</div>
  <div>{{ number }}</div>
  <button @click="increase">증가</button>
  <button @click="decrease">감소</button>
</template>

<script setup lang="ts">
  useSiteMeta({
    title: '홈',
    url: '/',
  });

  const number = ref(0);

  const increase = () => {
    number.value++;
  };

  const decrease = () => {
    number.value--;
  };

  const patchRes = useUpdate('/', {});
</script>

<style lang="scss" scoped></style>
