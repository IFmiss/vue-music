import Vue from 'vue'
import Router from 'vue-router'
// route level code-splitting
// this generates a separate chunk (login.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Main = () => import('./views/Main.vue')

// 登陆模块
const Login = () => import('./views/login')
const LoginSub = () => import('./views/login/sublogin')

// 首页五大类
const Find = () => import('./views/find')
const Account = () => import('./views/account')
const Video = () => import('./views/video')
const Mine = () => import('./views/mine')
const Firends = () => import('./views/firends')
const Recommend = () => import('./views/find/recommend')
const Station = () => import('./views/find/station')
const Daily = () => import('./views/find/daily')
const Sheet = () => import('./views/find/sheet')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'home',
      redirect: '/main/find',
      component: Main,
      children: [
        {
          path: '/main/find',
          name: 'find',
          redirect: '/main/find/recommend',
          component: Find,
          meta: {
            keepAlive: true
          },
          children: [
            {
              path: '/main/find/recommend',
              name: 'findrecommend',
              component: Recommend
            },
            {
              path: '/main/find/station',
              name: 'findstaion',
              component: Station
            }
          ]
        },
        {
          path: '/main/account',
          name: 'account',
          component: Account
        },
        {
          path: '/main/video',
          name: 'video',
          component: Video
        },
        {
          path: '/main/mine',
          name: 'mine',
          component: Mine
        },
        {
          path: '/main/firends',
          name: 'firends',
          component: Firends
        },

        // 每日推荐
        {
          path: '/main/daily',
          name: 'daily',
          component: Daily,
          meta: {
            transition: 'fade-left'
          }
        },

        // 歌单集合
        {
          path: '/main/sheet',
          name: 'sheet',
          component: Sheet,
          meta: {
            transition: 'fade-left'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      children: [
        {
          path: '/login/:type',
          name: 'loginsub',
          component: LoginSub
        }
      ]
    }
  ]
})
