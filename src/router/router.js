import { createRouter, createWebHashHistory } from 'vue-router'
import {  loginGuard,roleGuard,isAdminGuard,isUserGuard,isTechGuard,isAdmod,loginGuard2 } from './auth-guard'


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
    beforeEnter: [loginGuard2],
    redirect: { name: 'root'},
    component: () => import('../layouts/admin/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        beforeEnter: [isAdminGuard],
        name: 'root',
        redirect: { name: 'services'},
        component: () => import('../views/admin/AdminDashboard.vue')
      },
      {
        path: '/servicios',
        beforeEnter: [isAdmod],
        name: 'services',
        component: () => import('../views/admin/ServicesView.vue'),
   

      },
      {
        path: '/tecnicos',
        beforeEnter: [isAdminGuard],
        name: 'techs',
        component: () => import('../views/admin/TechsView.vue'),
   

      },
      {
        path: '/clientes',
        beforeEnter: [isAdmod],
       
        name: 'clients',
        component: () => import('../views/admin/ClientsView.vue'),
   

      },
      {
        path: '/tecnicos/:id',
        beforeEnter: [isAdmod],
        name: 'techs-details',
        component: () => import('../views/admin/TechDetailsView.vue'),


      },
      {
        path: '/clientes/:id',
        beforeEnter: [loginGuard2],
        name: 'clients-details',
        component: () => import('../views/admin/ClientsDetailsView.vue'),


      },
      {
        path: '/servicios/:id',
        beforeEnter: [loginGuard2],
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
        redirect: {name:'services'},
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
