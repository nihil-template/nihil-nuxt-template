import { useToast } from 'primevue/usetoast';

import type { ForgotPasswordType } from '@/schemas/user.schema';

export function useForgotPassword() {
  const toast = useToast();
  const isEmailSent = ref(false);

  const mutation = usePost<ForgotPasswordType, null>({
    url: [ 'auth', 'forgot-password', ],
    success(res) {
      console.log(res);

      isEmailSent.value = true;
      toast.add({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });
    },
    error(res) {
      console.log(res);

      toast.add({
        severity: 'error',
        summary: res.message,
        life: 3000,
      });
    },
  });

  return {
    ...mutation,
    isEmailSent,
  };
}
