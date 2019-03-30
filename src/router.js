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

// Find
const Recommend = () => import('./views/find/recommend')
const Station = () => import('./views/find/station')
const Daily = () => import('./views/find/daily')
const Sheet = () => import('./views/find/sheet')
const SheetDetail = () => import('./views/find/sheet/sheet-detail')
const Play = () => import('./views/find/play')
const Rank = () => import('./views/find/rank')
const Search = () => import('./views/find/search')

Vue.use(Router)

/**
 * 路由配置
 * meta对象下的属性意思
 * @param { String }   transition         过渡的动画  fade-left
 * @param { Array }    activeRouter       当前页面是属于四个菜单或者某个路由的关联操作，如果设置了/main/find 则打开该路由的话，底部菜单第一个按钮显示active状态
 * @param { Boolean }  isFull             是否全屏显示不显示底部菜单
 * @param { Boolean }  keepAlive          页面是否缓存
 * @param { Boolean }  showFixedMenu      右上角是否显示播放的固定菜单入口
 */
const myRouter = new Router({
  // mode: 'history',
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
          // 推荐
          children: [
            {
              path: '/main/find/recommend',
              name: 'findrecommend',
              component: Recommend,
              meta: {
                keepAlive: true
              }
            },
            {
              path: '/main/find/station',
              name: 'findstaion',
              component: Station
            }
          ]
        },
        // 个人中心
        {
          path: '/main/account',
          name: 'account',
          component: Account,
          meta: {
            keepAlive: true
          }
        },
        // 视频
        {
          path: '/main/video',
          name: 'video',
          component: Video,
          meta: {
            keepAlive: true
          }
        },
        // 我的
        {
          path: '/main/mine',
          name: 'mine',
          component: Mine,
          meta: {
            keepAlive: true
          }
        },
        // 朋友
        {
          path: '/main/firends',
          name: 'firends',
          component: Firends,
          meta: {
            keepAlive: true
          }
        },

        // 每日推荐
        {
          path: '/main/daily',
          name: 'daily',
          component: Daily,
          meta: {
            keepAlive: true,
            transition: 'fade-left',
            activeRouter: ['/main/find']
          }
        },

        // 歌单集合
        {
          path: '/main/sheet',
          name: 'sheet',
          component: Sheet,
          meta: {
            keepAlive: true,
            transition: 'fade-left',
            activeRouter: ['/main/find']
          }
        },
        // 歌单详情
        {
          path: '/main/listdetail',
          name: 'listdetail',
          component: SheetDetail,
          meta: {
            keepAlive: true,
            transition: 'fade-left',
            activeRouter: ['/main/find']
          }
        },

        // 播放页面
        {
          path: '/main/play',
          name: 'play',
          component: Play,
          meta: {
            keepAlive: true,
            transition: 'fade-left',
            isFull: true
          }
        },
        // 排行榜页面
        {
          path: '/main/rank',
          name: 'rank',
          component: Rank,
          meta: {
            keepAlive: true,
            transition: 'fade-left'
          }
        },
        // 搜索页面
        {
          path: '/main/search',
          name: 'search',
          component: Search,
          meta: {
            transition: 'fade-top',
            activeRouter: ['/main/find'],
            hideFixedMenu: true,
            keepAlive: true
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

export default myRouter
