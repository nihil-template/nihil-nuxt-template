import { webConfig } from '@repo/config/web.config';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: webConfig.apiRoute,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { provide: { api, }, };
});
