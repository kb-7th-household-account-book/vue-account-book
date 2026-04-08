import { createRouter, createWebHistory } from 'vue-router'
import Transactions from '@/views/Transactions.vue'
import Home from '@/views/Home.vue';
import Settings from '@/views/Settings.vue';
import Game from '@/views/Game.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Transactions,
    },
    {
      path: '/register',
      name: 'register',
      component: Transactions,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
  ],
});

export default router;
