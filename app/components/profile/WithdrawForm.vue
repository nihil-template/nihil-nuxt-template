<script setup lang="ts">
import { withdrawSchema, type WithdrawType } from '@repo/drizzle/schema';
import { toTypedSchema } from '@vee-validate/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import { useForm } from 'vee-validate';

import { cn } from '~/libs/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
});

const cssVariants = cva([
  'space-y-6',
], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

const isConfirming = ref(false);

// 회원 탈퇴 훅 (자동 임포트)
const { mutate: withdraw, pending: isPending, } = useWithdraw();

// vee-validate 폼 설정
const { defineField, handleSubmit, resetForm, isFieldValid, validate, } = useForm<WithdrawType>({
  validationSchema: toTypedSchema(withdrawSchema),
  initialValues: {
    password: '',
    passwordConfirm: '',
  },
});

const [ password, passwordAttrs, ] = defineField('password');
const [ passwordConfirm, passwordConfirmAttrs, ] = defineField('passwordConfirm');

const onSubmit = handleSubmit((data) => {
  if (!isConfirming.value) {
    isConfirming.value = true;
    return;
  }

  withdraw(data);
});

const handleCancel = () => {
  isConfirming.value = false;
  resetForm();
};

// 폼 유효성 확인
const isFormValid = computed(() => isFieldValid('password') && isFieldValid('passwordConfirm'));

onMounted(() => {
  validate();
});
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    <Card>
      <CardHeader>
        <CardTitle class='text-destructive'>
          회원 탈퇴
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class='mb-6 p-4 border border-destructive bg-destructive/10 rounded-lg'>
          <p class='text-destructive text-sm'>
            회원 탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
            신중하게 결정해주세요.
          </p>
        </div>

        <form
          class='space-y-6'
          @submit='onSubmit'
        >
          <FormField
            #default='{ componentField }'
            name='password'
          >
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  v-model='password'
                  type='password'
                  placeholder='현재 비밀번호를 입력하세요'
                  :disabled='isPending'
                  v-bind='{ ...componentField, ...passwordAttrs }'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            #default='{ componentField }'
            name='passwordConfirm'
          >
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  v-model='passwordConfirm'
                  type='password'
                  placeholder='비밀번호를 확인하세요'
                  :disabled='isPending'
                  v-bind='{ ...componentField, ...passwordConfirmAttrs }'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class='flex gap-4'>
            <template v-if='!isConfirming'>
              <Button
                type='submit'
                variant='destructive'
                :disabled='isPending || !isFormValid'
              >
                회원 탈퇴 진행
              </Button>
              <Button
                variant='outline'
                as-child
              >
                <NuxtLink to='/profile'>
                  취소
                </NuxtLink>
              </Button>
            </template>
            <template v-else>
              <Button
                type='submit'
                variant='destructive'
                :disabled='isPending'
              >
                {{ isPending ? '탈퇴 중...' : '최종 탈퇴 확인' }}
              </Button>
              <Button
                type='button'
                variant='outline'
                :disabled='isPending'
                @click='handleCancel'
              >
                취소
              </Button>
            </template>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
