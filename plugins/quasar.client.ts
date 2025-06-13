import { Quasar, Notify, Dialog, Loading } from 'quasar'
import langZhTW from 'quasar/lang/zh-TW'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    plugins: { Notify, Dialog, Loading },
    lang: langZhTW,
    config: {
      notify: {
        position: 'top-right',
        timeout: 2000
      },
      loading: {
        delay: 400
      }
    }
  })
})
