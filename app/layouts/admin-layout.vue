<script setup lang="ts">
// 관리자 페이지 전용 레이아웃
</script>

<template>
  <main class='flex min-h-screen items-center justify-center bg-muted/40 p-4'>
    <Card class='w-full max-w-md'>
      <CardHeader>
        <CardTitle>관리자 계정 생성</CardTitle>
        <CardDescription>
          새로운 관리자 계정을 생성합니다. 이 기능은 관리자만 사용할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <slot />
      </CardContent>
    </Card>
  </main>
</template>
