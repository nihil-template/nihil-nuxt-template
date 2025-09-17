<script setup lang="ts">
import { cn } from '~/libs/cn';

defineOptions({
  inheritAttrs: false,
});

const { session, pending: isPending, } = useGetSession();
</script>

<template>
  <ClientOnly>
    <nav
      v-if='!isPending'
      :class="cn('border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', $attrs.class as string)"
    >
      <div class='container mx-auto px-4 md:px-6'>
        <div class='flex h-12 items-center justify-between'>
          <div class='flex items-center gap-6'>
            <Button
              variant='ghost'
              size='sm'
              as-child
            >
              <NuxtLink to='/'>
                홈
              </NuxtLink>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              as-child
            >
              <NuxtLink to='/users'>
                사용자 목록
              </NuxtLink>
            </Button>
            <Button
              v-show='session?.data'
              variant='ghost'
              size='sm'
              as-child
            >
              <NuxtLink to='/profile'>
                마이페이지
              </NuxtLink>
            </Button>
          </div>
          <div class='flex items-center gap-2'>
            <!-- 추가 네비게이션 아이템들이 들어갈 수 있는 공간 -->
          </div>
        </div>
      </div>
    </nav>
    <template #fallback>
      <nav
        :class="cn('border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', $attrs.class as string)"
      >
        <div class='container mx-auto px-4 md:px-6'>
          <div class='flex h-12 items-center justify-between'>
            <div class='flex items-center gap-6'>
              <Button
                variant='ghost'
                size='sm'
                as-child
              >
                <NuxtLink to='/'>
                  홈
                </NuxtLink>
              </Button>
              <Button
                variant='ghost'
                size='sm'
                as-child
              >
                <NuxtLink to='/users'>
                  사용자 목록
                </NuxtLink>
              </Button>
            </div>
            <div class='flex items-center gap-2'>
              <!-- 추가 네비게이션 아이템들이 들어갈 수 있는 공간 -->
            </div>
          </div>
        </div>
      </nav>
    </template>
  </ClientOnly>
</template>
