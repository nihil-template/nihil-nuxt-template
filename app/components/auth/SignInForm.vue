<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';

import { useAuthCardStore } from '~/entities/auth/auth-card.store';
import { useAuthStore } from '~/entities/auth/auth.store';

import { signInSchema } from '@/schemas/user.schema';

const authCardStore = useAuthCardStore();
const { setAuthCardHeader } = authCardStore;

// Pinia 스토어에서 직접 세션 상태를 가져옵니다.
const authStore = useAuthStore();
const { session } = storeToRefs(authStore);

const formSchema = toTypedSchema(signInSchema);
const { handleSubmit, isSubmitting, errors, validate } = useForm({
  validationSchema: formSchema,
  initialValues: {
    emlAddr: '',
    password: '',
  },
});

// 로그인 여부 판단에 더 이상 useGetSession을 사용하지 않습니다.
const { mutate: signIn, pending: isSigningIn } = useSignIn();

const showModal = ref(false);

const onSubmit = handleSubmit(async (data) => {
  signIn(data);
});

onMounted(() => {
  setAuthCardHeader({
    title: '로그인',
    description: '로그인 후 서비스를 이용해주세요.',
  });

  validate();
});

// 스토어의 반응형 세션 상태를 감시합니다.
watch(session, (newSession) => {
  if (newSession) {
    showModal.value = true;
  }
}, { immediate: true });
</script>

<template>
  <div>
    <!-- 이제 `session`은 스토어를 직접 바라보므로, 이 조건만으로 충분합니다. -->
    <NotShow v-if='session' />
    <div v-else>
      <form
        class='flex flex-col gap-2 flex-1'
        @submit='onSubmit'
      >
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
        <FormInput
          :form='{ errors }'
          label='비밀번호'
          name='password'
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          auto-complete='current-password'
          required
          :disabled='isSubmitting'
        />
        <SubmitButton :disabled='isSigningIn'>
          {{ isSigningIn ? '로그인 중...' : '로그인' }}
        </SubmitButton>
      </form>

      <div class='flex flex-col gap-3 pt-4 border-t border-gray-200'>
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
            to='/auth/forgot-password'
            class='text-sm text-gray-500 hover:text-gray-700 transition-colors'
          >
            비밀번호를 잊으셨나요?
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
      description='로그인한 상태에서는 로그인 페이지에 접근할 수 없습니다. 홈으로 이동하거나 마이페이지로 이동해주세요.'
      @update:is-open='showModal = $event'
    />
  </div>
</template>

<style scoped>
/* SignInForm 컴포넌트 스타일 */
</style>
