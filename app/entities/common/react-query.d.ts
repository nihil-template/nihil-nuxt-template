import type { AxiosError } from 'axios'
import type { ErrorPayload } from './common.types'

declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AxiosError<ErrorPayload>
  }
}

