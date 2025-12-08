import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import CommandesListView from '@/views/CommandesListView.vue'
import CommandeCreateView from '@/views/CommandeCreateView.vue'
import CommandeDetailView from '@/views/CommandeDetailView.vue'

const routes = [
  { path: '/', name: 'login', component: import('@/views/Auth/Login.vue') },
  { path: '/home', name: 'home', component: import('@/views/HomeView.vue'), 
    children: [
      { path: '/dashboard', name: 'dashboard', component: import('@/views/DashboardView.vue') },
      { path: '/commandes', name: 'commandes', component: CommandesListView },
      { path: '/commandes/create', name: 'create-commande', component: CommandeCreateView },
      { path: '/commandes/:id', name: 'commande-detail', component: CommandeDetailView, props: true }
    ]
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})