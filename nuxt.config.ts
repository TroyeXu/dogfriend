import { defineNuxtConfig } from 'nuxt/config'
import { quasar } from '@quasar/vite-plugin'

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
        sassVariables: 'assets/quasar-variables.scss'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '~/assets/quasar-variables.scss';`
        }
      }
    }
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
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
      { code: 'zh', language: 'zh-TW', file: 'zh.json', name: '中文' }
    ],
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },

  }
})
