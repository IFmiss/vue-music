import Vue from 'vue'
import Router from 'vue-router'
// route level code-splitting
// this generates a separate chunk (login.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Main = () => import(/* webpackChunkName: "login" */ './views/Main.vue')
const Find = () => import(/* webpackChunkName: "login" */ './views/Main.vue')
const Login = () => import(/* webpackChunkName: "login" */ './views/login/')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
      children: [
        {
          path: '/find',
          name: 'find',
          component: Find
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
