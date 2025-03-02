import AboutPage from '@/views/AboutPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MainPage from '@/views/MainPage.vue';
import RentListPage from '@/views/RentListPage.vue';
import RentObjectPage from '@/views/RentObjectPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/rent-list',
      name: 'rent-list',
      component: RentListPage,
    },
    {
      path: '/rent/:id',
      name: 'rent-object',
      component: RentObjectPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
    },
    {
      path: '/log-in',
      name: 'log-in',
      component: LoginPage,
    }
  ],
});

export default router;
