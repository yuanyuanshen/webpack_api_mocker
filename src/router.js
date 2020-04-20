import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoogleMap from '@/components/googleMap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/a',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'GoogleMap',
      component: GoogleMap
    },
    {
      path: '/github_stars_top',
      name: '',
      component: () => import('./views/githubStarsTop')
    }
  ]
})
