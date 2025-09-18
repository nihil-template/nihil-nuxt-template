import { PrimeVueConfiguration } from 'primevue/config'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $primevue: {
      config: PrimeVueConfiguration
    }
  }
}

export {}