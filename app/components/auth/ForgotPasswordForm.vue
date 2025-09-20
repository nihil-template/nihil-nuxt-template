<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { forgotPasswordSchema, type ForgotPasswordType } from '~/schemas/user.schema';

const form = useForm<ForgotPasswordType>({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    emlAddr: '',
  },
});

const { mutate: forgotPassword } = useForgotPassword();

const onSubmitForm = async () => {
  // 수동으로 유효성 검사 실행
  const { valid } = await form.validate();

  if (!valid) {
    return;
  }

  // 유효성 검사 통과 시 폼 데이터 사용
  const formData = form.values;

  // 이메일을 세션 스토리지에 저장 (reset-password에서 사용하기 위해)
  if (process.client) {
    sessionStorage.setItem('resetPasswordEmail', formData.emlAddr);
  }

  await forgotPassword(formData);
};

// 페이지 로드 시 즉시 유효성 검사 실행
onMounted(async () => {
  // 빈 데이터로 유효성 검사만 실행 (에러 표시용)
  await form.validate();
});
</script>

<template>
  <div>
    <h2>비밀번호 재설정 요청</h2>
    <p>가입한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.</p>

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

      <Button type='submit' label='재설정 링크 발송' />

      <div>
        <NuxtLink to='/auth/signin'>
          로그인으로 돌아가기
        </NuxtLink>
      </div>
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

p {
  @apply text-gray-600 mb-4;
}

div:last-child {
  @apply mt-4 text-center;
}
</style>
