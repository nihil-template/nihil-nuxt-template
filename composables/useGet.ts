export async function useGet<T>(url: string) {
  const res = await useFetch<T>(url);

  return res;
}
