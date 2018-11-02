import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import 'amfe-flexible'
// 图标字体
import '@/assets/font-icon/style.css'

// 引入接口api地址
import API from 'api'

// 提示组件
import Msg from 'vue-message'

// 通用js组件  来自 d-js-utils
import Dutils from 'd-js-utils'

// 项目内的通用组件挂在  来自 utils/index.js
import Mutils from 'utils'

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

// 初始化用户登陆状态校验
Vue.prototype.$mutils.fetchData(API.USER_LOGIN_STATUS).then(res => {
  if (!res.data.bindings[0] || res.data.bindings[0].expired) {
    Vue.prototype.$msg('登陆过期')
    router.push('/login')
  }
}, err => {
  Vue.prototype.$msg(err)
  router.push('/login')
})
export {vueProject}
