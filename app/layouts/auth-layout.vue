<script setup lang="ts">
// This is the layout for authentication pages.
</script>

<template>
  <main class='flex min-h-screen items-center justify-center bg-muted/40 p-4 overflow-hidden'>
    <AuthCard>
      <slot />
    </AuthCard>
  </main>
</template>
