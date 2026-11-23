import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const SITE_NAME = 'Атлантика'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: `${SITE_NAME} — рыба горячего и холодного копчения в Бийске`, transparentHeader: true },
  },
  {
    path: '/products',
    name: 'catalog',
    component: () => import('@/views/CatalogView.vue'),
    meta: { title: `Каталог продукции — ${SITE_NAME}` },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: `Страница не найдена — ${SITE_NAME}` },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // Смена фильтров каталога (query) не должна прокручивать страницу.
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ?? SITE_NAME
})

export default router
