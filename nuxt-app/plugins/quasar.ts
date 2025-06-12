import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Quasar, {
    plugins: { Notify },
    config: {
      dark: 'auto',
      notify: {
        position: 'top-right',
        timeout: 2000,
        textColor: 'white'
      }
    }
  })
})
