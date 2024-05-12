import { createApp } from 'vue'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import 'normalize.css'
import './main.scss'
import * as components from 'vuetify/components'

import { createVuetify } from 'vuetify'
import { GesturePlugin } from '@vueuse/gesture'

import * as directives from 'vuetify/directives'

import router from './router.js'
import store from './store/index.js'
import App from './App.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.use(GesturePlugin)

app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.component('BaseSpinner', BaseSpinner)

app.mount('#app')

router.beforeEach((to, from, next) => {
  // Scroll to the top of the page
  window.scrollTo(0, 0)
  next()
})
