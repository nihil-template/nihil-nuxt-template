import { toast } from 'vue-sonner';

import { getToastStyle } from '~/libs/getToastStyle';

import type { ForgotPasswordType } from '@/schemas/user.schema';

export function useForgotPassword() {
  const isEmailSent = ref(false);

  const mutation = usePost<ForgotPasswordType, null>({
    url: [ 'auth', 'forgot-password', ],
    success(res) {
      console.log(res);

      isEmailSent.value = true;
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
    },
    error(res) {
      console.log(res);

      toast.error(res.message, {
        style: getToastStyle('error'),
      });
    },
  });

  return {
    ...mutation,
    isEmailSent,
  };
}
