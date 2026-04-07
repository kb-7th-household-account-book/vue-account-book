import { createRouter, createWebHistory } from 'vue-router'
import Transaction from '@/views/Transaction.vue'
import Home from '@/views/Home.vue' // 새로 만든 Home 컴포넌트 불러오기

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: Transaction
    }
  ],
})

export default router
