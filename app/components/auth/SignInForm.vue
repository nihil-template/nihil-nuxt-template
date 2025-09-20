<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { signInSchema, type SignInType } from '~/schemas/user.schema';

const form = useForm<SignInType>({
  validationSchema: toTypedSchema(signInSchema),
  initialValues: {
    emlAddr: '',
    password: '',
  },
});

const { mutate: signIn } = useSignIn();

const onSubmitForm = async () => {
  // 수동으로 유효성 검사 실행
  const { valid } = await form.validate();

  if (!valid) {
    return;
  }

  // 유효성 검사 통과 시 폼 데이터 사용
  const formData = form.values;

  await signIn(formData);
};

// 페이지 로드 시 즉시 유효성 검사 실행
onMounted(async () => {
  // 빈 데이터로 유효성 검사만 실행 (에러 표시용)
  await form.validate();
});
</script>

<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent='onSubmitForm'>
      <VeeField name='emlAddr' #default='{ field, meta }'>
        <IftaLabel :class="{ 'error': !meta.valid }">
          <InputText
            v-bind='field'
            id='emlAddr'
            type='email'
            :class="{ 'error': !meta.valid }"
          />
          <label for='emlAddr'>
            이메일
          </label>
        </IftaLabel>
        <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
      </VeeField>

      <VeeField name='password' #default='{ field, meta }'>
        <IftaLabel :class="{ 'error': !meta.valid }">
          <InputText
            v-bind='field'
            id='password'
            type='password'
            autocomplete='current-password'
            :class="{ 'error': !meta.valid }"
          />
          <label for='password'>
            비밀번호
          </label>
        </IftaLabel>
        <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
      </VeeField>

      <Button type='submit' label='로그인' />
    </form>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

/* 에러 상태 스타일 */
.error {
  @apply border-red-500 ring-red-500;

  & label {
    @apply text-red-500;
  }

  & input {
    @apply border-red-500 focus:ring-red-500 focus:border-red-500;
  }
}

/* 에러 메시지 스타일 */
.error-message {
  @apply text-red-500 text-sm mt-1 font-900 italic;
}
</style>
