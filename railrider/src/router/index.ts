import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: () => "/dashboard"
  },
  {
    path: "/dashboard",
    name: 'Dashboard',
    meta: {
      icon: "mdi-view-dashboard"
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: "/map",
    name: "Map",
    meta: {
      icon: "mdi-map"
    },
    component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue')
  },
  {
    path: '/scanner',
    name: 'Scanner',
    meta: {
      icon: "mdi-radio"
    },
    component: () => import(/* webpackChunkName: "scanner" */ '../views/Scanner.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      icon: "mdi-cog"
    },
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
