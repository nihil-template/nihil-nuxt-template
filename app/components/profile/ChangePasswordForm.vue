<script setup lang="ts">
import { changePasswordSchema, type ChangePasswordType } from '@/schemas/user.schema';
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

const { mutate: changePassword, pending: isPending, } = useChangePassword();

const { defineField, handleSubmit, validate, } = useForm<ChangePasswordType>({
  validationSchema: toTypedSchema(changePasswordSchema),
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
});

const [ currentPassword, currentPasswordAttrs, ] = defineField('currentPassword');
const [ newPassword, newPasswordAttrs, ] = defineField('newPassword');
const [ confirmPassword, confirmPasswordAttrs, ] = defineField('confirmPassword');

const onSubmit = handleSubmit((data) => {
  changePassword(data);
});

onMounted(() => {
  validate();
});
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    <Card>
      <CardHeader>
        <CardTitle>
          비밀번호 변경
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form class='space-y-6' @submit='onSubmit'>
          <FormField #default='{ componentField }' name='currentPassword'>
            <FormItem>
              <FormLabel>현재 비밀번호</FormLabel>
              <FormControl>
                <Input
                  v-model='currentPassword'
                  type='password'
                  placeholder='현재 비밀번호를 입력하세요'
                  :disabled='isPending'
                  v-bind='{ ...componentField, ...currentPasswordAttrs }'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField #default='{ componentField }' name='newPassword'>
            <FormItem>
              <FormLabel>새 비밀번호</FormLabel>
              <FormControl>
                <Input
                  v-model='newPassword'
                  type='password'
                  placeholder='새 비밀번호를 입력하세요 (10자 이상, 영문/숫자/특수문자 포함)'
                  :disabled='isPending'
                  v-bind='{ ...componentField, ...newPasswordAttrs }'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField #default='{ componentField }' name='confirmPassword'>
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  v-model='confirmPassword'
                  type='password'
                  placeholder='비밀번호를 다시 입력하세요'
                  :disabled='isPending'
                  v-bind='{ ...componentField, ...confirmPasswordAttrs }'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class='flex gap-4'>
            <Button type='submit' :disabled='isPending'>
              {{ isPending ? '변경 중...' : '비밀번호 변경' }}
            </Button>
            <Button variant='outline' as-child>
              <NuxtLink to='/profile'>
                취소
              </NuxtLink>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
