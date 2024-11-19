import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Tabs, TabPane, Dialog, Button, Pagination } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import qs from 'qs'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

// 使用 fontawesome
library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// 使用 vue-loading-overlay 組件
Vue.component('Loading', Loading)

// 使用 axios
Vue.use(VueAxios, axios)

// 使用 elementUI
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Pagination)

// 全域註冊 qs
Vue.prototype.$qs = qs

new Vue({
  render: h => h(App)
}).$mount('#app')
