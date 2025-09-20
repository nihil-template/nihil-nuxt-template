<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '~/entities/auth/auth.store';
import { updateUserSchema, type UpdateUserType } from '~/schemas/user.schema';

const authStore = useAuthStore();
const { session } = storeToRefs(authStore);

const form = useForm<UpdateUserType>({
  validationSchema: toTypedSchema(updateUserSchema),
  initialValues: {
    userNm: session.value?.userNm || '',
    proflImg: session.value?.proflImg || '',
    userBiogp: session.value?.userBiogp || '',
  },
});

const { mutate: updateProfile } = useUpdateProfile();

const onSubmitForm = async () => {
  // 수동으로 유효성 검사 실행
  const { valid } = await form.validate();

  if (!valid) {
    return;
  }

  // 유효성 검사 통과 시 폼 데이터 사용
  const formData = form.values;

  await updateProfile(formData);
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
    <h1>프로필 수정</h1>

    <ClientOnly>
      <div v-if='session'>
        <form @submit.prevent='onSubmitForm'>
          <VeeField name='userNm' #default='{ field, meta }'>
            <IftaLabel :class="{ 'error': !meta.valid }">
              <InputText
                v-bind='field'
                id='userNm'
                type='text'
                :class="{ 'error': !meta.valid }"
              />
              <label for='userNm'>
                사용자명
              </label>
            </IftaLabel>
            <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
          </VeeField>

          <VeeField name='proflImg' #default='{ field, meta }'>
            <IftaLabel :class="{ 'error': !meta.valid }">
              <InputText
                v-bind='field'
                id='proflImg'
                type='url'
                :class="{ 'error': !meta.valid }"
              />
              <label for='proflImg'>
                프로필 이미지 URL
              </label>
            </IftaLabel>
            <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
          </VeeField>

          <VeeField name='userBiogp' #default='{ field, meta }'>
            <IftaLabel :class="{ 'error': !meta.valid }">
              <Textarea
                v-bind='field'
                id='userBiogp'
                rows='4'
                :class="{ 'error': !meta.valid }"
              />
              <label for='userBiogp'>
                자기소개
              </label>
            </IftaLabel>
            <VeeErrorMessage :name='field.name' :class="{ 'error-message': !meta.valid }" />
          </VeeField>

          <div>
            <Button type='submit' label='프로필 수정' />
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

  & input,
  & textarea {
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
