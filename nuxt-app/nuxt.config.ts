import { quasar } from '@quasar/vite-plugin'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/i18n'
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
  },
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'zh', file: 'zh.json', name: '中文' }
    ],
    defaultLocale: 'zh',
    vueI18n: {
      legacy: false,
      locale: 'zh',
      fallbackLocale: 'zh'
    }
  }
})
