import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'; // 새로 만든 Home 컴포넌트 불러오기
import Calendar from '@/views/Calendar.vue';
import Transactions from '@/views/Transactions.vue';
import Settings from '@/views/Settings.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/register',
      name: 'register',
      component: Transactions,
    },
  ],
});

export default router;
