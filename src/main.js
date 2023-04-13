import { createApp } from 'vue'
import router from './router/router'

import './style.css'
import 'mosha-vue-toastify/dist/style.css'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css' 


//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'

        
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    }
  },
})



createApp(App)
.use(vuetify)
.use(router)
.mount('#app')
