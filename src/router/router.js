import { createRouter, createWebHashHistory } from 'vue-router'
import {  loginGuard,roleGuard,isAdminGuard,isUserGuard,isTechGuard } from './auth-guard'


const routes = [
  {
    path: '/',
    redirect: { name: 'login' }

  },
  {
    path: '/access',
    beforeEnter: [roleGuard],
    name: 'main-log',
    component: () => import('../views/admin/AdminDashboard.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/PageNotFoundView.vue')

  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('../views/Unauthorized.vue')

  },
  {
    path: '/auth',
    redirect: { name: 'login' },
    beforeEnter: [loginGuard],
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/auth/LoginView.vue'),

      }
    ]
  },
  {
    path: '/admin',
    beforeEnter: [isAdminGuard],
    redirect: { name: 'root'},
    component: () => import('../layouts/admin/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        beforeEnter: [isAdminGuard],
        name: 'root',
        component: () => import('../views/admin/AdminDashboard.vue')
      },

      {
        path: 'dashboard/servicios',
        beforeEnter: [isAdminGuard],
        name: 'services',
        component: () => import('../views/admin/ServicesView.vue'),
        children: [
          
        ]

      },
      {
        path: 'dashboard/servicios/:id',
        beforeEnter: [isAdminGuard],
        name: 'services-details',

        component: () => import('../views/admin/ServiceDatailsView.vue'),


      },

    ]
  },
  {
    path: '/usuario',
    redirect: {name: 'userDashboard' },
    beforeEnter: [isUserGuard],
    component: () => import('../layouts/user/CustomerLayout.vue'),
    children: [
      {
        path: 'dashboard',
        beforeEnter: [isUserGuard],
        name: 'userDashboard',
        component: ()=> import('../views/customer/DashboardCustomerView.vue')
      }
    ]

  },
  {
    path: '/tecnico',
    beforeEnter: [isTechGuard],
    redirect: {name: 'techDashboard' },
    component: ()=> import('../layouts/user/TechLayout.vue'),
    children: [
      {
        path: 'dashboard',
        beforeEnter: [isTechGuard],
        name: 'techDashboard',
        component: ()=> import('../views/tech/DashboardTechView.vue')
      }
    ]





  }
  

  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
