// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'

Vue.config.productionTip = false

/* eslint-disable no-new */

console.log(router)

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})

// new Vue({
//   router,
//   template: '<App/>',
//   components: { App }
// }).$mount('#app')
