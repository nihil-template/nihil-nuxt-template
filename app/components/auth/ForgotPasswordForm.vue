<script setup lang="ts">
import { forgotPasswordSchema } from '@repo/drizzle/schema';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useAuthCardStore } from '~/entities/auth/auth-card.store';

const authCardStore = useAuthCardStore();
const { setAuthCardHeader, } = authCardStore;

const formSchema = toTypedSchema(forgotPasswordSchema);
const { handleSubmit, isSubmitting, errors, validate, } = useForm({
  validationSchema: formSchema,
  initialValues: { emlAddr: '', },
});

// 자동 임포트된 훅들 사용
const { session, pending: loading, } = useGetSession();
const {
  mutate: forgotPassword,
  pending: isForgottingPassword,
  response: forgotPasswordResponse,
  isEmailSent,
} = useForgotPassword();

const showModal = ref(false);

const onSubmit = handleSubmit(async (data) => {
  forgotPassword(data);
});

onMounted(() => {
  setAuthCardHeader({
    title: '비밀번호 재설정 요청',
    description: '가입시 입력한 이메일 주소를 입력해주세요. 비밀번호 재설정 링크를 전송해드립니다.',
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
      <div v-if='isEmailSent' class='text-center py-8'>
        <div class='mb-4'>
          <div class='w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center'>
            <svg class='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h3 class='text-lg font-semibold text-gray-900 mb-2'>
            이메일이 발송되었습니다
          </h3>
          <p class='text-gray-600 mb-4'>
            입력하신 이메일 주소로 비밀번호 재설정 링크를 발송했습니다.<br>
            이메일을 확인하시고 링크를 클릭하여 비밀번호를 재설정해주세요.
          </p>
          <p class='text-sm text-gray-500'>
            이메일이 오지 않았다면 스팸 폴더를 확인해보세요.
          </p>
        </div>
      </div>
      <form
        v-else
        class='flex flex-col gap-2 flex-1'
        @submit='onSubmit'
      >
        <FormInput
          :form='{ errors }'
          label='이메일'
          name='emlAddr'
          type='email'
          placeholder='가입한 이메일을 입력해주세요.'
          auto-complete='email'
          required
          :disabled='isSubmitting'
        />
        <SubmitButton :disabled='isForgottingPassword'>
          {{ isForgottingPassword ? '임시 비밀번호 발송 중...' : '임시 비밀번호 발송' }}
        </SubmitButton>

        <div v-if='forgotPasswordResponse'>
          {{ forgotPasswordResponse.message }}
        </div>
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
          <span class='text-sm text-gray-600'>
            계정이 없으신가요?
          </span>
          <NuxtLink
            to='/auth/signup'
            class='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
          >
            회원가입
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
      description='로그인한 상태에서는 비밀번호 찾기 페이지에 접근할 수 없습니다. 홈으로 이동하거나 마이페이지로 이동해주세요.'
      @update:is-open='showModal = $event'
    />
  </div>
</template>

<style scoped>
/* ForgotPasswordForm 컴포넌트 스타일 */
</style>
