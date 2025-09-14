<script setup lang="ts">
import { Button } from '~/components/common/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/common/ui/dialog';
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
  <Dialog
    :open='props.isOpen'
    @update:open="(value) => emit('update:isOpen', value)"
  >
    <DialogContent :class="cn('sm:max-w-md')">
      <DialogHeader>
        <DialogTitle>{{ props.title }}</DialogTitle>
        <DialogDescription>{{ props.description }}</DialogDescription>
      </DialogHeader>
      <DialogFooter class='flex gap-2 !justify-center items-center'>
        <Button
          variant='outline'
          @click='onClickGoHome'
        >
          홈으로
        </Button>
        <Button @click='onClickGoProfile'>
          마이페이지
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
/* AuthRedirectModal 컴포넌트 스타일 */
</style>
