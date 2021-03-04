import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/Index.vue')
  },
  {
    path: '/kategori/:id',
    name:'kategori.show',
    component: () => import('@/views/program/List.vue')
  },
  {
    path: '/program/:id',
    name:'program.show',
    component: () => import('@/views/program/Show.vue')
  },
  {
    path: '/',
    name:'home',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
