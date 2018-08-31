import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import 'amfe-flexible'
// 图标字体
import '@/assets/font-icon/style.css'

import Msg from 'vue-message'
import Dutils from 'd-js-utils'

Vue.use(Msg, {
  text: 'Hello world', duration: 3000, background: 'rgba(7,17,27,0.6)'
})
Vue.prototype.$dutils = Dutils

Vue.config.productionTip = false

let vueProject = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
console.log(vueProject)
