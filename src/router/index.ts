import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../src/views/HomeView.vue'
import CategoryView from '../../src/views/CategoryView.vue'
import TheProduct from '../../src/components/TheProduct.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../../src/views/AboutView.vue')
    },
    {
      path: '/category',
      name: 'Category',
      component: CategoryView
    },
    {
      path: '/:Style/:Title',
      name: 'TheProduct',
      component: TheProduct
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('../../src/views/AccountView.vue')
    },
    {
      path: '/user/:FirstAndLastName',
      name: 'User',
      component: () => import('../../src/views/UserView.vue')
    },
    {
      path: '/account/register',
      name: 'Register',
      component: () => import('../../src/components/AccountComp/RegisterPage.vue')
    }
  ]
})

export default router
