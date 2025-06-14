import lang from "quasar/lang/zh-TW.js"
import iconSet from "quasar/icon-set/material-icons.js"
import { Notify,Dialog,Loading } from "quasar"
import { QBtn,QInput } from "quasar"

export const componentsWithDefaults = { QBtn,QInput }

export const appConfigKey = "nuxtQuasar"

export const quasarNuxtConfig = {
  lang,
  iconSet,
  components: {"defaults":{"QBtn":{"dense":true,"unelevated":true},"QInput":{"outlined":true,"dense":true}}},
  plugins: {Notify,Dialog,Loading},
  config: {"brand":{"primary":"#1976D2","secondary":"#26A69A","accent":"#9C27B0","positive":"#21BA45","negative":"#C10015","info":"#31CCEC","warning":"#F2C037"},"notify":{"position":"top-right","timeout":3000},"loading":{"delay":400}}
}