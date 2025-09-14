import { computed } from 'vue';

export function useDone(loading: boolean, isSuccess: boolean) {
  const done = computed(() => !loading && isSuccess);
  return done.value;
}
