type Ids = string[] | number[];

export async function useDeleteMany<T>(name: string, url: string, ids: Ids) {
  const res = await useAsyncData(name, () =>
    $fetch<T>(`/api${url}`, {
      method: 'DELETE',
      body: {
        ids,
      },
    })
  );

  return res;
}
