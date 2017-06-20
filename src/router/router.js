import Vue from 'vue'
import Router from 'vue-router'
import Search from './../components/search/search'
import Musiclist from './../components/musiclist/musiclist'

Vue.use(Router)

export default new Router({
  routes: [
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
