<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { Field } from 'vee-validate';
import { ref, computed } from 'vue';

// TODO: PrimeVue 컴포넌트로 교체 필요
// import { Button } from '~/components/common/ui/button';
// import { FormControl, FormItem, FormLabel, FormMessage } from '~/components/common/ui/form';
// import { Input } from '~/components/common/ui/input';
import { cn } from '~/libs/cn';

import { fieldContainerVariants, inputVariants, itemVariants, labelVariants } from './form-input.cva';

interface Props extends /* @vue-ignore */ VariantProps<typeof itemVariants> {
  class?: string;
  form: any; // VeeValidate form object (더 유연한 타입)
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
  labelClass?: string; // Vue에서는 class 사용
  inputClass?: string; // Vue에서는 class 사용
  layout?: 'vertical' | 'horizontal';
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'error' | 'disabled';
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  type: 'text',
  layout: 'vertical',
  size: 'default',
  variant: 'default',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const showPassword = ref(false);

// 비밀번호 타입인지 확인
const isPasswordType = computed(() => props.type === 'password');

// 실제 입력 타입 결정
const inputType = computed(() => {
  if (isPasswordType.value && showPassword.value) {
    return 'text';
  }
  return props.type;
});

// 비밀번호 표시/숨김 토글
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// 입력값 변경 처리
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// 에러 상태 확인
const hasError = computed(() => {
  return !!props.form.errors[props.name];
});
</script>

<template>
  <Field
    #default='{ field, errorMessage }'
    :name='name'
  >
    <FormItem :class='cn(itemVariants({}), props.class)'>
      <div :class='cn(fieldContainerVariants({ layout }))'>
        <FormLabel
          :class='cn(
            labelVariants({
              layout,
              disabled: props.disabled,
            }),
            props.labelClass
          )'
        >
          {{ label }}
          <span
            v-if='required'
            class='text-destructive'
          >
            *
          </span>
        </FormLabel>

        <FormControl>
          <div class='relative'>
            <Input
              v-bind='field'
              :type='inputType'
              :placeholder='placeholder'
              :autocomplete='autoComplete'
              :disabled='props.disabled'
              :class="cn(
                inputVariants({
                  variant: hasError
                    ? 'error'
                    : props.disabled
                      ? 'disabled'
                      : props.variant || 'default',
                  size: props.size || 'default',
                }),
                // 비밀번호 타입인 경우 우측 패딩 추가
                isPasswordType && 'pr-10',
                props.inputClass
              )"
              @input='handleInput'
            />

            <Button
              v-if='isPasswordType'
              type='button'
              variant='ghost'
              size='sm'
              class='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
              :disabled='props.disabled'
              @click='togglePassword'
            >
              <UIcon
                v-if='!showPassword'
                name='i-heroicons-eye'
                class='h-4 w-4 text-muted-foreground'
              />
              <UIcon
                v-else
                name='i-heroicons-eye-slash'
                class='h-4 w-4 text-muted-foreground'
              />
            </Button>
          </div>
        </FormControl>
      </div>

      <FormMessage class='ml-auto'>
        {{ errorMessage }}
      </FormMessage>
    </FormItem>
  </Field>
</template>

<style scoped>
/* 추가 스타일이 필요한 경우 여기에 작성 */
</style>
