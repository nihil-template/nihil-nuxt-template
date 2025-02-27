export async function useGet<T>(name: string, url: string) {
  const res = await useAsyncData(name, () => $fetch<T>(`/api${url}`));

  return res;
}
