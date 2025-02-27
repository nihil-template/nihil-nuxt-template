export async function useDelete<T>(name: string, url: string) {
  const res = await useAsyncData(name, () =>
    $fetch<T>(`/api${url}`, {
      method: 'DELETE',
    })
  );

  return res;
}
