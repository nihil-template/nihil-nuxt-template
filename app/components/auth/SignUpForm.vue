<script setup lang="ts">
import { createUserSchema } from '@repo/drizzle/schema';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useAuthCardStore } from '~/entities/auth/auth-card.store';

// Pinia store
const authCardStore = useAuthCardStore();
const { setAuthCardHeader, } = authCardStore;

// VeeValidate + shadcn 폼 설정
const formSchema = toTypedSchema(createUserSchema);

const { handleSubmit, isSubmitting, errors, validate, } = useForm({
  validationSchema: formSchema,
  initialValues: {
    emlAddr: '',
    userNm: '',
    userRole: 'USER' as const,
    password: '',
    passwordConfirm: '',
  },
});

// 자동 임포트된 훅들 사용
const { session, pending: loading, } = useGetSession();
const { mutate, pending: isSigningUp, } = useSignUp();

const showModal = ref(false);

// 폼 제출 핸들러
const onSubmit = handleSubmit(async (data) => {
  mutate(data);
});

// AuthCard 헤더 설정
onMounted(() => {
  setAuthCardHeader({
    title: '회원가입',
    description: '새로운 계정을 만들어 서비스를 이용해보세요.',
  });

  validate();
});

// 세션 체크
watchEffect(() => {
  if (!loading && session.value) {
    showModal.value = true;
  }
});
</script>

<template>
  <div>
    <!-- 이미 로그인한 상태 -->
    <NotShow v-if='!loading && session' />

    <div v-else>
      <!-- 회원가입 폼 -->
      <form
        class='flex flex-col gap-2 flex-1'
        @submit='onSubmit'
      >
        <!-- 이메일 -->
        <FormInput
          :form='{ errors }'
          label='이메일'
          name='emlAddr'
          type='email'
          placeholder='이메일을 입력해주세요.'
          auto-complete='username'
          required
          :disabled='isSubmitting'
        />

        <!-- 사용자명 -->
        <FormInput
          :form='{ errors }'
          label='사용자명'
          name='userNm'
          type='text'
          placeholder='사용자명을 입력해주세요.'
          required
          :disabled='isSubmitting'
        />

        <!-- Hidden userRole field -->
        <input
          type='hidden'
          name='userRole'
          value='USER'
        >

        <!-- 비밀번호 -->
        <FormInput
          :form='{ errors }'
          label='비밀번호'
          name='password'
          type='password'
          placeholder='비밀번호를 입력해주세요. (10자 이상, 영문/숫자/특수문자 포함)'
          auto-complete='new-password'
          required
          :disabled='isSubmitting'
        />

        <!-- 비밀번호 확인 -->
        <FormInput
          :form='{ errors }'
          label='비밀번호 확인'
          name='passwordConfirm'
          type='password'
          placeholder='비밀번호를 다시 입력해주세요.'
          auto-complete='new-password'
          required
          :disabled='isSubmitting'
        />

        <!-- 제출 버튼 -->
        <SubmitButton :disabled='isSigningUp'>
          {{ isSigningUp ? '회원가입 중...' : '회원가입' }}
        </SubmitButton>
      </form>

      <!-- 유틸리티 링크들 -->
      <div class='flex flex-col gap-3 pt-4 border-t border-gray-200'>
        <!-- 로그인 링크 -->
        <div class='text-center'>
          <span class='text-sm text-gray-600'>
            이미 계정이 있으신가요?
          </span>
          <NuxtLink
            to='/auth/signin'
            class='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
          >
            로그인
          </NuxtLink>
        </div>

        <!-- 홈으로 돌아가기 링크 -->
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

    <!-- 이미 로그인된 사용자를 위한 모달 -->
    <AuthRedirectModal
      v-if='session'
      :is-open='showModal'
      title='이미 로그인되어 있습니다'
      description='로그인한 상태에서는 회원가입 페이지에 접근할 수 없습니다. 홈으로 이동하거나 마이페이지로 이동해주세요.'
      @close='showModal = false'
    />
  </div>
</template>

<style scoped>
/* SignUpForm 컴포넌트 스타일 */
</style>
