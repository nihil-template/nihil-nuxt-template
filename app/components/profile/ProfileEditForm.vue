<script setup lang="ts">
import { updateUserSchema, type UpdateUserType } from '@repo/drizzle/schema';
import { toTypedSchema } from '@vee-validate/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import { useForm } from 'vee-validate';

import { cn } from '~/libs/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
});

const cssVariants = cva([
  'space-y-6',
], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

// 세션 상태 확인 (자동 임포트)
const { session, pending: isSessionPending, } = useGetSession();

// 개별 필드 편집 상태 관리
const editingField = ref<string | null>(null);

// 프로필 업데이트 훅 (자동 임포트)
const { mutate: updateProfile, pending: isPending, } = useUpdateProfile();

// vee-validate 폼 설정
const { defineField, resetForm, validate, } = useForm<UpdateUserType>({
  validationSchema: toTypedSchema(updateUserSchema),
  initialValues: {
    userNm: '',
    proflImg: '',
    userBiogp: '',
  },
});

const [ userNm, ] = defineField('userNm');
const [ proflImg, ] = defineField('proflImg');
const [ userBiogp, ] = defineField('userBiogp');

// 세션 데이터가 로드되면 폼 기본값 설정
watch(session, (newSession) => {
  if (newSession) {
    resetForm({
      values: {
        userNm: newSession.data?.userNm || '',
        proflImg: newSession.data?.proflImg || '',
        userBiogp: newSession.data?.userBiogp || '',
      },
    });
  }
}, { immediate: true, });

// 폼 초기 검증
onMounted(() => {
  nextTick(() => {
    validate();
  });
});

// 개별 필드 수정 함수들
const handleFieldUpdate = (fieldName: string, value: string) => {
  if (session.value) {
    const updateData: Partial<UpdateUserType> = {};
    updateData[fieldName as keyof UpdateUserType] = value;
    updateProfile(updateData);
  }
};

const handleEditField = (fieldName: string) => {
  editingField.value = fieldName;
};

const handleCancelEdit = () => {
  editingField.value = null;
  resetForm({
    values: {
      userNm: session.value?.data?.userNm || '',
      proflImg: session.value?.data?.proflImg || '',
      userBiogp: session.value?.data?.userBiogp || '',
    },
  });
};
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    <!-- 로딩 상태 -->
    <div
      v-if='isSessionPending'
      class='animate-pulse space-y-4'
    >
      <div class='h-4 bg-muted rounded w-1/4' />
      <div class='h-4 bg-muted rounded w-1/2' />
      <div class='h-4 bg-muted rounded w-3/4' />
    </div>

    <!-- 세션 없음 -->
    <p
      v-else-if='!session'
      class='text-center text-muted-foreground'
    >
      세션 정보를 불러올 수 없습니다.
    </p>

    <!-- 프로필 수정 폼 -->
    <Card v-else>
      <CardHeader>
        <CardTitle>프로필 수정</CardTitle>
      </CardHeader>
      <CardContent class='space-y-6'>
        <!-- 이름 필드 -->
        <div class='space-y-2'>
          <label for='userNm' class='text-sm font-medium'>
            이름
          </label>
          <div v-if='editingField === "userNm"' class='flex gap-2'>
            <Input
              id='userNm'
              placeholder='이름을 입력하세요'
              :model-value='userNm'
              :disabled='isPending'
              @update:model-value='userNm = String($event)'
            />
            <Button
              size='sm'
              :disabled='isPending'
              @click='handleFieldUpdate("userNm", userNm || "")'
            >
              {{ isPending ? '수정 중...' : '저장' }}
            </Button>
            <Button
              size='sm'
              variant='outline'
              :disabled='isPending'
              @click='handleCancelEdit'
            >
              취소
            </Button>
          </div>
          <div v-else class='flex items-center justify-between p-3 border rounded-md bg-muted/50'>
            <span>{{ session?.data?.userNm || '이름이 설정되지 않았습니다.' }}</span>
            <Button
              size='sm'
              variant='outline'
              @click='handleEditField("userNm")'
            >
              수정
            </Button>
          </div>
        </div>

        <!-- 프로필 이미지 필드 -->
        <div class='space-y-2'>
          <label for='proflImg' class='text-sm font-medium'>
            프로필 이미지
          </label>
          <div v-if='editingField === "proflImg"' class='flex gap-2'>
            <Input
              id='proflImg'
              type='text'
              placeholder='프로필 이미지 URL'
              :model-value='proflImg || ""'
              :disabled='isPending'
              @update:model-value='proflImg = String($event)'
            />
            <Button
              size='sm'
              :disabled='isPending'
              @click='handleFieldUpdate("proflImg", proflImg || "")'
            >
              {{ isPending ? '수정 중...' : '저장' }}
            </Button>
            <Button
              size='sm'
              variant='outline'
              :disabled='isPending'
              @click='handleCancelEdit'
            >
              취소
            </Button>
          </div>
          <div v-else class='flex items-center justify-between p-3 border rounded-md bg-muted/50'>
            <span>{{ session?.data?.proflImg || '프로필 이미지가 설정되지 않았습니다.' }}</span>
            <Button
              size='sm'
              variant='outline'
              @click='handleEditField("proflImg")'
            >
              수정
            </Button>
          </div>
        </div>

        <!-- 자기소개 필드 -->
        <div class='space-y-2'>
          <label for='userBiogp' class='text-sm font-medium'>
            자기소개
          </label>
          <div v-if='editingField === "userBiogp"' class='flex gap-2'>
            <Input
              id='userBiogp'
              type='text'
              placeholder='자기소개를 입력하세요'
              :model-value='userBiogp || ""'
              :disabled='isPending'
              @update:model-value='userBiogp = String($event)'
            />
            <Button
              size='sm'
              :disabled='isPending'
              @click='handleFieldUpdate("userBiogp", userBiogp || "")'
            >
              {{ isPending ? '수정 중...' : '저장' }}
            </Button>
            <Button
              size='sm'
              variant='outline'
              :disabled='isPending'
              @click='handleCancelEdit'
            >
              취소
            </Button>
          </div>
          <div v-else class='flex items-center justify-between p-3 border rounded-md bg-muted/50'>
            <span>{{ session?.data?.userBiogp || '자기소개가 설정되지 않았습니다.' }}</span>
            <Button
              size='sm'
              variant='outline'
              @click='handleEditField("userBiogp")'
            >
              수정
            </Button>
          </div>
        </div>

        <div class='flex gap-4 pt-4'>
          <Button variant='outline' as-child>
            <NuxtLink to='/profile'>
              마이페이지로 돌아가기
            </NuxtLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
