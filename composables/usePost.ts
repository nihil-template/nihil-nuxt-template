export async function usePost<T, D extends object>(name: string, url: string, data: D) {
  const res = await useAsyncData(name, () =>
    $fetch<T>(`/api${url}`, {
      method: 'POST',
      body: data,
    })
  );

  return res;
}
