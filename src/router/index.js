import AboutPage from '@/views/AboutPage.vue';
import ApartmentPage from '@/views/ApartmentPage.vue';
import ContactPage from '@/views/ContactPage.vue';
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
      path: '/apartment',
      name: 'apartment',
      component: ApartmentPage,
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
