<script setup lang="ts">
import { cn } from '~/libs/cn';

const props = defineProps<{
  isOpen: boolean;
  title: string;
  description: string;
}>();

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

const router = useRouter();

function onClickGoHome() {
  emit('update:isOpen', false);
  router.push('/');
}

function onClickGoProfile() {
  emit('update:isOpen', false);
  router.push('/profile');
}
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click="emit('update:isOpen', false)"
  >
    <div
      :class="cn('bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4')"
      @click.stop
    >
      <div class="mb-4">
        <h2 class="text-lg font-semibold mb-2">{{ props.title }}</h2>
        <p class="text-gray-600">{{ props.description }}</p>
      </div>
      <div class="flex gap-2 justify-center">
        <button
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          @click="onClickGoHome"
        >
          홈으로
        </button>
        <button
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          @click="onClickGoProfile"
        >
          마이페이지
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* AuthRedirectModal 컴포넌트 스타일 */
</style>
