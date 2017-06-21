import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from './../components/search/search'
import Musiclist from './../components/musiclist/musiclist'

Vue.use(VueRouter)

// export default new VueRouter({
//   routes: [
//     {
//       path: '/musiclist',
//       component: Musiclist
//     },
//     {
//       path: '/search',
//       name: 'Search',
//       component: Search
//     }
//   ]
// })
var router = new VueRouter({
  routes: [
    {
      path: '/'
    },
    {
      path: '/musiclist',
      component: Musiclist
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})

export default router
