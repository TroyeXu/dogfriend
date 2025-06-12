import { quasar } from '@quasar/vite-plugin'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
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
  }
})
