<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import { useForm } from 'vee-validate';

import { cn } from '~/libs/cn';

import { createUserSchema, type CreateUserType } from '@/schemas/user.schema';

interface Props
  extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const cssVariants = cva(
  [
    `flex flex-col gap-2 flex-1`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  },
);

const props = withDefaults(defineProps<Props>(), {
  class: '',
});

const { mutate: adminSignUp, pending: isPending } = useAdminSignUp();

const form = useForm({
  validationSchema: toTypedSchema(createUserSchema),
  initialValues: {
    emlAddr: '',
    userNm: '',
    password: '',
    passwordConfirm: '',
    userRole: 'ADMIN' as const,
  },
});

const onSubmit = form.handleSubmit((data: CreateUserType) => {
  adminSignUp(data);
});

onMounted(() => {
  form.validate();
});
</script>

<template>
  <Form :form='form'>
    <form
      :class='cn(cssVariants({}), props.class)'
      @submit='onSubmit'
    >
      <FormInput
        :form='form'
        label='이메일'
        name='emlAddr'
        type='email'
        placeholder='관리자 이메일을 입력해주세요.'
        auto-complete='username'
        required
        :disabled='isPending'
      />

      <FormInput
        :form='form'
        label='사용자명'
        name='userNm'
        type='text'
        placeholder='관리자명을 입력해주세요.'
        required
        :disabled='isPending'
      />

      <input
        v-model='form.values.userRole'
        type='hidden'
        value='ADMIN'
      >

      <FormInput
        :form='form'
        label='비밀번호'
        name='password'
        type='password'
        placeholder='비밀번호를 입력해주세요. (10자 이상, 영문/숫자/특수문자 포함)'
        auto-complete='new-password'
        required
        :disabled='isPending'
      />

      <FormInput
        :form='form'
        label='비밀번호 확인'
        name='passwordConfirm'
        type='password'
        placeholder='비밀번호를 다시 입력해주세요.'
        auto-complete='new-password'
        required
        :disabled='isPending'
      />

      <SubmitButton>
        {{ isPending ? '관리자 계정 생성 중...' : '관리자 계정 생성' }}
      </SubmitButton>
    </form>
  </Form>

  <div class='pt-4 mt-4 border-t text-center'>
    <NuxtLink
      to='/users'
      class='text-sm text-gray-600 hover:text-gray-800 transition-colors'
    >
      사용자 목록으로 돌아가기
    </NuxtLink>
  </div>
</template>
