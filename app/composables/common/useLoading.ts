import { computed } from 'vue';

export function useLoading(isLoading: boolean, isFetching: boolean) {
  const loading = computed(() => isLoading || isFetching);
  return loading.value;
}
