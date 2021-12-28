import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Tabs, TabPane, Dialog, Button, Pagination } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('Loading', Loading)

Vue.use(VueAxios, axios)

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Pagination)

new Vue({
  render: h => h(App)
}).$mount('#app')
