<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { createUserSchema } from '@/schemas/user.schema';

const { mutate, pending } = useAdminSignUp();

const { handleSubmit, resetForm, validate } = useForm({
  validationSchema: toTypedSchema(createUserSchema),
  initialValues: {
    emlAddr: '',
    userNm: '',
    userRole: 'ADMIN',
    password: '',
    passwordConfirm: '',
  },
});

const onSubmit = handleSubmit((values) => {
  // ADMIN 역할로 설정하여 전송
  mutate({
    emlAddr: values.emlAddr,
    userNm: values.userNm,
    userRole: 'ADMIN' as const,
    password: values.password,
  });
});

const onResetForm = () => {
  resetForm();
};

onMounted(() => {
  validate();
});
</script>

<template>
  <div class='new-admin-container'>
    <div class='page-header'>
      <div class='header-content'>
        <div class='header-info'>
          <h1>신규 관리자 추가</h1>
          <p class='header-description'>
            새로운 관리자 계정을 생성합니다. 관리자 권한으로 시스템에 접근할 수 있습니다.
          </p>
        </div>
        <div class='header-actions'>
          <NuxtLink to='/admin'>
            <Button
              label='대시보드로'
              icon='pi pi-arrow-left'
              severity='secondary'
              outlined
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class='form-container'>
      <div class='form-card'>
        <div class='form-header'>
          <h2>관리자 정보 입력</h2>
          <p>모든 필드는 필수 입력 사항입니다.</p>
        </div>

        <form class='admin-form' @submit.prevent='onSubmit'>
          <div class='form-grid'>
            <!-- 이메일 -->
            <div class='form-field'>
              <VeeField
                name='emlAddr'
                #default='{ field, meta }'
              >
                <IftaLabel :class="{ 'error': !meta.valid }">
                  <InputText
                    v-bind='field'
                    type='email'
                    id='emlAddr'
                    autocomplete='email'
                    :class="{ 'error': !meta.valid }"
                  />
                  <label for='emlAddr'>
                    이메일 주소
                  </label>
                </IftaLabel>
                <VeeErrorMessage
                  name='emlAddr'
                  class='error-message'
                />
              </VeeField>
            </div>

            <!-- 사용자명 -->
            <div class='form-field'>
              <VeeField
                name='userNm'
                #default='{ field, meta }'
              >
                <IftaLabel :class="{ 'error': !meta.valid }">
                  <label for='userNm'>
                    사용자명
                  </label>
                  <InputText
                    v-bind='field'
                    id='userNm'
                    autocomplete='username'
                    :class="{ 'error': !meta.valid }"
                  />
                </IftaLabel>
                <VeeErrorMessage
                  name='userNm'
                  class='error-message'
                />
              </VeeField>
            </div>

            <!-- 비밀번호 -->
            <div class='form-field'>
              <VeeField
                name='password'
                #default='{ field, meta }'
              >
                <IftaLabel :class="{ 'error': !meta.valid }">
                  <Password
                    v-bind='field'
                    id='password'
                    autocomplete='new-password'
                    placeholder='안전한 비밀번호를 입력하세요'
                    toggle-mask
                    :feedback='false'
                    :class="{ 'error': !meta.valid }"
                  />
                  <label for='password'>
                    비밀번호
                  </label>
                </IftaLabel>
                <VeeErrorMessage
                  name='password'
                  class='error-message'
                />
              </VeeField>
            </div>

            <!-- 비밀번호 확인 -->
            <div class='form-field'>
              <VeeField
                name='passwordConfirm'
                #default='{ field, meta }'
              >
                <IftaLabel :class="{ 'error': !meta.valid }">
                  <Password
                    v-bind='field'
                    id='passwordConfirm'
                    autocomplete='new-password'
                    toggle-mask
                    :feedback='false'
                    :class="{ 'error': !meta.valid }"
                  />
                  <label for='passwordConfirm'>
                    비밀번호 확인
                  </label>
                </IftaLabel>
                <VeeErrorMessage
                  name='passwordConfirm'
                  class='error-message'
                />
              </VeeField>
            </div>
          </div>

          <!-- 폼 액션 -->
          <div class='form-actions'>
            <Button
              type='button'
              label='초기화'
              severity='secondary'
              outlined
              @click='onResetForm'
              :disabled='pending'
            />
            <Button
              type='submit'
              label='관리자 추가'
              icon='pi pi-user-plus'
              :loading='pending'
              :disabled='pending'
            />
          </div>
        </form>
      </div>
    </div>

    <!-- 안내 사항 -->
    <div class='info-card'>
      <div class='info-header'>
        <i class='pi pi-info-circle' />
        <h3>관리자 권한 안내</h3>
      </div>
      <ul class='info-list'>
        <li>
          <i class='pi pi-check' />
          전체 사용자 관리 권한
        </li>
        <li>
          <i class='pi pi-check' />
          시스템 설정 변경 권한
        </li>
        <li>
          <i class='pi pi-check' />
          로그 및 통계 조회 권한
        </li>
        <li>
          <i class='pi pi-check' />
          다른 관리자 추가/삭제 권한
        </li>
      </ul>
      <div class='info-warning'>
        <i class='pi pi-exclamation-triangle' />
        <span>관리자 권한은 신중하게 부여해주세요.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.new-admin-container {
  @apply max-w-7xl mx-auto space-y-6;
}

/* 페이지 헤더 */
.page-header {
  @apply bg-white rounded-2 shadow-sm border p-6;
}

.header-content {
  @apply flex items-start justify-between gap-6;
}

.header-info h1 {
  @apply text-h2 font-bold text-gray-900 mb-2;
}

.header-description {
  @apply text-gray-600;
}

.header-actions {
  @apply flex-shrink-0;
}

/* 폼 컨테이너 */
.form-container {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-6;
}

.form-card {
  @apply lg:col-span-2 bg-white rounded-2 shadow-sm border;
}

.form-header {
  @apply p-6 border-b border-gray-200;
}

.form-header h2 {
  @apply text-h5 font-semibold text-gray-900 mb-2;
}

.form-header p {
  @apply text-gray-600;
}

/* 폼 스타일 */
.admin-form {
  @apply p-6;
}

.form-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6 mb-8;
}

.form-field {
  @apply space-y-2;
}

.form-field.full-width {
  @apply md:col-span-2;
}

.form-field label {
  @apply block text-sm font-medium text-gray-700;
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

.form-actions {
  @apply flex items-center justify-end gap-3 pt-6 border-t border-gray-200;
}

/* 정보 카드 */
.info-card {
  @apply bg-blue-50 rounded-2 border border-blue-200 p-6 h-fit;
}

.info-header {
  @apply flex items-center gap-3 mb-4;
}

.info-header i {
  @apply text-blue-600 text-h6;
}

.info-header h3 {
  @apply text-h6 font-semibold text-blue-900;
}

.info-list {
  @apply space-y-3 mb-6;
}

.info-list li {
  @apply flex items-center gap-3 text-sm text-blue-800;
}

.info-list i {
  @apply text-blue-600 flex-shrink-0;
}

.info-warning {
  @apply flex items-center gap-2 text-sm text-amber-700 bg-amber-100 p-3 rounded-2 border border-amber-200;
}

.info-warning i {
  @apply text-amber-600 flex-shrink-0;
}
</style>
