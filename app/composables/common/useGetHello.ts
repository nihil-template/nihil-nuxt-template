import { useGet } from '~/composables/common/api/useAPIGet';

export function useGetHello() {
  const { data, ...other } = useGet<string>({
    url: [ 'hello', ],
    success(response) {
      console.log(response);
    },
  });

  return { data, ...other, };
}
