<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '~/entities/auth/auth.store';
import { withdrawSchema, type WithdrawType } from '~/schemas/user.schema';

const authStore = useAuthStore();
const { session } = storeToRefs(authStore);

const form = useForm<WithdrawType>({
  validationSchema: toTypedSchema(withdrawSchema),
  initialValues: {
    password: '',
    passwordConfirm: '',
  },
});

const { mutate: withdraw } = useWithdraw();

const onSubmitForm = async () => {
  // 수동으로 유효성 검사 실행
  const { valid } = await form.validate();

  if (!valid) {
    return;
  }

  // API에 보낼 데이터 (passwordConfirm 제외)
  const apiData = {
    password: form.values.password,
  };

  await withdraw(apiData);
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
    <h1>회원탈퇴</h1>

    <ClientOnly>
      <div v-if='session'>
        <div>
          <h2>⚠️ 주의사항</h2>
          <ul>
            <li>회원탈퇴 시 모든 데이터가 삭제됩니다.</li>
            <li>탈퇴 후에는 동일한 이메일로 재가입이 불가능할 수 있습니다.</li>
            <li>이 작업은 되돌릴 수 없습니다.</li>
          </ul>
        </div>

        <p>{{ session.emlAddr }} 계정을 탈퇴하시려면 비밀번호를 입력해주세요.</p>

        <form @submit.prevent='onSubmitForm'>
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

          <VeeField name='passwordConfirm' #default='{ field, meta }'>
            <IftaLabel :class="{ 'error': !meta.valid }">
              <InputText
                v-bind='field'
                id='passwordConfirm'
                type='password'
                autocomplete='current-password'
                :class="{ 'error': !meta.valid }"
              />
              <label for='passwordConfirm'>
                비밀번호 확인
              </label>
            </IftaLabel>
            <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
          </VeeField>

          <div>
            <Button type='submit' label='회원탈퇴' severity='danger' />
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

h2 {
  @apply text-lg font-semibold mb-3 text-red-600;
}

div:nth-child(2) {
  @apply bg-red-50 border border-red-200 rounded-2 p-4 mb-6;
}

ul {
  @apply list-disc list-inside space-y-1 text-red-700;
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
