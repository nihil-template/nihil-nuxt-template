<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '~/entities/auth/auth.store';
import { changePasswordSchema, type ChangePasswordType } from '~/schemas/user.schema';

const authStore = useAuthStore();
const { session } = storeToRefs(authStore);

const form = useForm<ChangePasswordType>({
  validationSchema: toTypedSchema(changePasswordSchema),
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
});

const { mutate: changePassword } = useChangePassword();

const onSubmitForm = async () => {
  // 수동으로 유효성 검사 실행
  const { valid } = await form.validate();

  if (!valid) {
    return;
  }

  // API에 보낼 데이터 (confirmPassword 제외)
  const apiData = {
    currentPassword: form.values.currentPassword,
    newPassword: form.values.newPassword,
  };

  await changePassword(apiData);
};

// 페이지 로드 시 즉시 유효성 검사 실행
onMounted(async () => {
  // 빈 데이터로 유효성 검사만 실행 (에러 표시용)
  await form.validate();
});

// 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트
watch(session, (sessionData) => {
  if (!sessionData) {
    navigateTo('/auth/signin');
  }
}, { immediate: true });
</script>

<template>
  <div>
    <h1>비밀번호 변경</h1>

    <ClientOnly>
      <div v-if='session'>
        <p>{{ session.emlAddr }}의 비밀번호를 변경합니다.</p>

        <form @submit.prevent='onSubmitForm'>
          <VeeField name='currentPassword' #default='{ field, meta }'>
            <IftaLabel :class="{ 'error': !meta.valid }">
              <InputText
                v-bind='field'
                id='currentPassword'
                type='password'
                autocomplete='current-password'
                :class="{ 'error': !meta.valid }"
              />
              <label for='currentPassword'>
                현재 비밀번호
              </label>
            </IftaLabel>
            <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
          </VeeField>

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
                새 비밀번호 확인
              </label>
            </IftaLabel>
            <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
          </VeeField>

          <div>
            <Button type='submit' label='비밀번호 변경' />
            <NuxtLink to='/profile'>
              <Button type='button' label='취소' severity='secondary' />
            </NuxtLink>
          </div>
        </form>
      </div>

      <div v-else>
        <p>로그인이 필요합니다.</p>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

h1 {
  @apply text-h3 font-bold mb-6;
}

p {
  @apply text-gray-600 mb-4;
}

form {
  @apply bg-white rounded-2 shadow p-6 max-w-md;
}

form > div:not(:last-child) {
  @apply mb-4;
}

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

/* 버튼 컨테이너 */
div:last-child {
  @apply flex gap-4 mt-6;
}
</style>
