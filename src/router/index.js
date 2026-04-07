import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'; // 새로 만든 Home 컴포넌트 불러오기
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
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
});

export default router;
