<script setup lang="ts">
import { resetPasswordSchema } from '@/schemas/user.schema';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useAuthCardStore } from '~/entities/auth/auth-card.store';

const authCardStore = useAuthCardStore();
const { setAuthCardHeader, } = authCardStore;
const route = useRoute();

const formSchema = toTypedSchema(resetPasswordSchema);
const { handleSubmit, isSubmitting, errors, setFieldValue, validate, } = useForm({
  validationSchema: formSchema,
  initialValues: {
    resetToken: '',
    newPassword: '',
    confirmPassword: '',
  },
});

// 자동 임포트된 훅들 사용
const { session, pending: loading, } = useGetSession();
const {
  mutate: setNewPassword,
  pending: isSettingPassword,
} = useResetPassword();

const showModal = ref(false);

const onSubmit = handleSubmit(async (data) => {
  setNewPassword(data);
});

onMounted(() => {
  const token = route.query.token;
  if (token && typeof token === 'string') {
    setFieldValue('resetToken', token);
  }
  setAuthCardHeader({
    title: '새 비밀번호 설정',
    description: '새로운 비밀번호를 입력해주세요.',
  });

  validate();
});

watchEffect(() => {
  if (!loading && session.value) {
    showModal.value = true;
  }
});
</script>

<template>
  <div>
    <NotShow v-if='!loading && session' />
    <div v-else>
      <form
        class='flex flex-col gap-2 flex-1'
        @submit='onSubmit'
      >
        <FormInput
          :form='{ errors }'
          label='새 비밀번호'
          name='newPassword'
          type='password'
          placeholder='새 비밀번호를 입력해주세요. (10자 이상, 영문/숫자/특수문자 포함)'
          auto-complete='new-password'
          required
          :disabled='isSubmitting'
        />
        <FormInput
          :form='{ errors }'
          label='비밀번호 확인'
          name='confirmPassword'
          type='password'
          placeholder='비밀번호를 다시 입력해주세요.'
          auto-complete='new-password'
          required
          :disabled='isSubmitting'
        />
        <SubmitButton :disabled='isSettingPassword'>
          {{ isSettingPassword ? '비밀번호 설정 중...' : '비밀번호 설정' }}
        </SubmitButton>
      </form>

      <div class='flex flex-col gap-3 pt-4 border-t border-gray-200'>
        <div class='text-center'>
          <NuxtLink
            to='/auth/signin'
            class='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
          >
            로그인으로 돌아가기
          </NuxtLink>
        </div>
        <div class='text-center'>
          <NuxtLink
            to='/'
            class='text-sm text-gray-400 hover:text-gray-600 transition-colors'
          >
            홈으로 돌아가기
          </NuxtLink>
        </div>
      </div>
    </div>
    <AuthRedirectModal
      v-if='session'
      :is-open='showModal'
      title='이미 로그인되어 있습니다'
      description='로그인한 상태에서는 새 비밀번호 설정 페이지에 접근할 수 없습니다. 홈으로 이동하거나 마이페이지로 이동해주세요.'
      @update:is-open='showModal = $event'
      @close='showModal = false'
    />
  </div>
</template>

<style scoped>
/* NewPasswordForm 컴포넌트 스타일 */
</style>
