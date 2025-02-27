import { HttpStatusCode } from '~/types/http-status.types';

export function setResponse<T>(response: ApiResponse<T>) {
  return response satisfies ApiResponse<T>;
}
