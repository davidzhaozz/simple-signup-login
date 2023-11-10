import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (!authStore.isLoggedIn) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/RegisterView.vue')
    }
  ]
})

export default router
