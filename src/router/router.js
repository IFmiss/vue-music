import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from './../components/search/search'
import MyMusic from './../components/mymusic/mymusic'
import FindMusic from './../components/findmusic/findmusic'
import Community from './../components/community/community'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/mymusic'
    },
    {
      path: '/mymusic',
      component: MyMusic
    },
    {
      path: '/findmusic',
      component: FindMusic
    },
    {
      path: '/community',
      component: Community
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
