<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">홈</NuxtLink>
        <NuxtLink to="/test">테스트</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { NuxtLink } from '#components';
</script>

<style lang="scss" scoped></style>
