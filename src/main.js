import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import 'amfe-flexible'
// 图标字体
import '@/assets/font-icon/style.css'

// 提示组件
import Msg from 'vue-message'

// 通用js组件  来自 d-js-utils
import Dutils from 'd-js-utils'

// 项目内的通用组件挂在  来自 utils/index.js
import Mutils from 'utils'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'style/view.scss'
import filters from 'filter'

// 引入指令
import 'directive/imgsize'

Vue.use(VueAwesomeSwiper)

Vue.use(Msg, {
  text: 'Hello world', duration: 3000, background: 'rgba(7,8,9,0.8)'
})

// 挂载
Vue.prototype.$dutils = Dutils
Vue.prototype.$mutils = Mutils
// 手机横屏提示
Vue.prototype.$dutils.device.checkLayoutOrientation()

Vue.config.productionTip = false

// 准备实例化
let vueProject = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 注册filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 初始化用户登陆状态校验
store.dispatch('LOGIN_STATUS_SETTERS').then(() => {
  vueProject.$msg('登陆校验成功')
}, () => {
  vueProject.$msg('登陆校验失败')
})

export default vueProject
