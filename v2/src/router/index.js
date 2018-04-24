import Vue from 'vue'
import Router from 'vue-router'
import musicIndex from '@/components/musicIndex/musicIndex'
import Find from '@/components/find/find'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'
import Mine from '@/components/mine/mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'musicIndex',
      redirect: '/find',
      component: musicIndex,
      children: [
        {
          path: '/find',
          name: 'find',
          component: Find
        },
        {
          path: '/singer',
          name: 'singer',
          component: Singer
        },
        {
          path: '/rank',
          name: 'rank',
          component: Rank
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine
        }
      ]
    }
  ]
})
