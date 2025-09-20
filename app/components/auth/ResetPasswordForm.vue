<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { resetPasswordSchema, type ResetPasswordType } from '~/schemas/user.schema';

interface Props {
  resetToken: string;
  email: string;
}

const props = defineProps<Props>();

const form = useForm<ResetPasswordType>({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    resetToken: props.resetToken,
    newPassword: '',
    confirmPassword: '',
  },
});

const { mutate: resetPassword } = useResetPassword();

const onSubmitForm = async () => {
  // 수동으로 유효성 검사 실행
  const { valid } = await form.validate();

  if (!valid) {
    return;
  }

  // API에 보낼 데이터 (confirmPassword 제외하고 emlAddr 추가)
  const apiData = {
    emlAddr: props.email,
    resetToken: props.resetToken,
    newPassword: form.values.newPassword,
  };

  await resetPassword(apiData);
};

// 페이지 로드 시 즉시 유효성 검사 실행
onMounted(async () => {
  // 빈 데이터로 유효성 검사만 실행 (에러 표시용)
  await form.validate();
});
</script>

<template>
  <div>
    <h2>비밀번호 재설정</h2>
    <p>{{ email }}로 새로운 비밀번호를 설정합니다.</p>

    <form @submit.prevent='onSubmitForm'>
      <VeeField name='newPassword' #default='{ field, meta }'>
        <IftaLabel :class="{ 'error': !meta.valid }">
          <InputText
            v-bind='field'
            id='newPassword'
            type='password'
            autocomplete='new-password'
            :class="{ 'error': !meta.valid }"
          />
          <label for='newPassword'>
            새 비밀번호
          </label>
        </IftaLabel>
        <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
      </VeeField>

      <VeeField name='confirmPassword' #default='{ field, meta }'>
        <IftaLabel :class="{ 'error': !meta.valid }">
          <InputText
            v-bind='field'
            id='confirmPassword'
            type='password'
            autocomplete='new-password'
            :class="{ 'error': !meta.valid }"
          />
          <label for='confirmPassword'>
            비밀번호 확인
          </label>
        </IftaLabel>
        <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
      </VeeField>

      <Button type='submit' label='비밀번호 재설정' />

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
