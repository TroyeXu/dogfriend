import { quasar } from '@quasar/vite-plugin'
import { defineNuxtConfig } from 'nuxt/config'

// 導入語言文件

export default defineNuxtConfig({
  // 添加相容性日期
  compatibilityDate: '2025-06-14',
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
    strategy: 'no_prefix',
    defaultLocale: 'zh',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'zh', iso: 'zh-TW', file: 'zh.json', name: '中文' }
    ],
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    vueI18n: {
      legacy: false,
      locale: 'zh',
      fallbackLocale: 'zh'
    }
  }
})
