import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../src/views/HomeView.vue'
import CategoryView from '../../src/views/CategoryView.vue'
import TheProduct from '../../src/components/CategoryComp/TheProduct.vue'
import CartView from '../../src/views/CartView.vue'
import SearchView from '../../src/views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category',
      name: 'Category',
      component: CategoryView
    },
    {
      path: '/:theStyle/:theTite',
      name: 'TheProduct',
      component: TheProduct
    },
    {
      path: '/:theLink',
      component: () => import('../../src/components/TestComp.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    }
  ]
})

export default router
