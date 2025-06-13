import { quasar } from '@quasar/vite-plugin'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  css: [
    'quasar/src/css/index.sass',
    '~/assets/global.scss'
  ],
  vite: {
    plugins: [
      quasar({
        sassVariables: 'quasar-variables.scss'
      })
    ]
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Care Calculator',
      short_name: 'CareCalc',
      description: 'Care service management and scheduling app',
      theme_color: '#ffffff'
    }
  }
})
