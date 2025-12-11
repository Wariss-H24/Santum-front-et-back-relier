import { createRouter, createWebHistory } from 'vue-router'

import CommandesListView from '@/views/CommandesListView.vue'
import CommandeCreateView from '@/views/CommandeCreateView.vue'
import CommandeDetailView from '@/views/CommandeDetailView.vue'
import CommandeEditView from '@/views/CommandeEditView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Auth/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
      { path: 'commandes', name: 'commandes', component: CommandesListView },
  { path: 'commandes/create', name: 'create-commande', component: CommandeCreateView },
  { path: 'commandes/:id', name: 'commande-detail', component: CommandeDetailView, props: true },
  {path : 'commandes/:id/edit', name: 'edit-commande', component: CommandeEditView, props: true}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware global
router.beforeEach((to, from, next) => {
  const isLogged = sessionStorage.getItem("token") !== null;

  if (to.meta.requiresAuth && !isLogged) {
    return next({ name: 'login' });
  }

  if (to.name === 'login' && isLogged) {
    return next({ name: 'dashboard' });
  }

  next();
});

export default router;
