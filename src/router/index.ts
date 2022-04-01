import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: 'Home',
    meta: {
      icon: "mdi-home"
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: "/routes",
    name: "Routes",
    component: () => import(/* webpackChunkName: "home" */ '../views/Routes.vue')
  },
  {
    path: "/app",
    component: () => import(/* webpackChunkName: "application" */ '../views/Application.vue'),
    children: [
      {
        path: "train-finder",
        name: 'TrainFinder',
        meta: {
          icon: "mdi-map-marker-radius"
        },
        component: () => import(/* webpackChunkName: "trainFinder" */ '../views/TrainFinder.vue')
      },
      {
        path: "dashboard",
        name: 'Dashboard',
        meta: {
          icon: "mdi-view-dashboard"
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
      },
      {
        path: "map",
        name: "Map",
        meta: {
          icon: "mdi-map"
        },
        component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue')
      },
      {
        path: "scanner",
        name: 'Scanner',
        meta: {
          icon: "mdi-radio"
        },
        component: () => import(/* webpackChunkName: "scanner" */ '../views/Scanner.vue')
      },
      {
        path: "raw",
        name: 'RawData',
        meta: {
          icon: "mdi-code-braces"
        },
        component: () => import(/* webpackChunkName: "rawData" */ '../views/RawData.vue')
      },
      {
        path: "settings",
        name: 'Settings',
        meta: {
          icon: "mdi-cog"
        },
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
