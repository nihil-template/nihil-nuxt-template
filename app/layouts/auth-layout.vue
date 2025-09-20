<script setup lang="ts">
</script>

<template>
  <main>
    <Card>
      <template #title>
        <h1>auth 레이아웃</h1>
        <NuxtLink to='/'>
          홈으로
        </NuxtLink>
      </template>
      <template #content>
        <slot />
      </template>
    </Card>
  </main>
</template>

<style scoped>
  /*  */
</style>
