import { defineNuxtPlugin } from 'nuxt/app';

import { config } from '@/config/config';

export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: config.api.route,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { provide: { api, }, };
});
