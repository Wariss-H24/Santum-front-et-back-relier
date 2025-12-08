<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Tableau de bord</h2>

    <!-- Statistiques principales -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <div
    v-for="card in statsCards"
    :key="card.label"
    class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex items-center gap-4 transition hover:shadow-lg"
  >
    <!-- Icône -->
    <div
      class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow"
      :class="card.bg"
    >
      <component :is="card.icon" class="w-7 h-7" />
    </div>

    <!-- Textes -->
    <div>
      <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ card.value }}</h3>
      <p class="text-gray-500 dark:text-gray-300 text-sm">{{ card.label }}</p>

      <div class="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span>+0% ce mois</span>
      </div>
    </div>
  </div>
</div>


    <!-- Liste des dernières commandes -->
    <div class="bg-white rounded shadow p-4 mt-10">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-semibold">Dernières commandes</h3>
        <RouterLink
          to="/commandes"
          class="text-blue-600 hover:underline text-sm"
        >
          Voir tout
        </RouterLink>
      </div>

      <table class="w-full">
        <thead class="bg-gray-100">
          <tr class="text-left">
            <th class="p-2">Numéro</th>
            <th class="p-2">Chauffeur</th>
            <th class="p-2">Destination</th>
            <th class="p-2">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cmd in lastCommandes"
            :key="cmd.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="p-2 font-medium">{{ cmd.numero }}</td>
            <td class="p-2">{{ cmd.nom_chauffeur }}</td>
            <td class="p-2">{{ cmd.destination }}</td>
            <td class="p-2">
              <span
                :class="{
                  'text-yellow-600': cmd.statut === 'en_attente',
                  'text-blue-600': cmd.statut === 'en_route',
                  'text-green-600': cmd.statut === 'livree'
                }"
              >
                {{ cmd.statut }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="lastCommandes?.length === 0" class="text-center text-gray-500 py-4">
        Aucune commande enregistrée.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useCommandeStore } from "@/stores/commandeStore"

// Icônes Lucide
import { Package, Users, Truck, CheckCircle } from "lucide-vue-next"

const store = useCommandeStore()

const total = computed(() => store.commandes.length)
const enAttente = computed(() => store.commandes.filter(c => c.statut === "en_attente").length)
const enRoute = computed(() => store.commandes.filter(c => c.statut === "en_route").length)
const livrees = computed(() => store.commandes.filter(c => c.statut === "livree").length)

const statsCards = computed(() => [
  {
    label: "Total commandes",
    value: total.value,
    icon: Package,
    bg: "bg-gradient-to-br from-indigo-500 to-purple-500"
  },
  {
    label: "En attente",
    value: enAttente.value,
    icon: Users,
    bg: "bg-gradient-to-br from-pink-500 to-rose-500"
  },
  {
    label: "En route",
    value: enRoute.value,
    icon: Truck,
    bg: "bg-gradient-to-br from-cyan-400 to-sky-500"
  },
  {
    label: "Livrées",
    value: livrees.value,
    icon: CheckCircle,
    bg: "bg-gradient-to-br from-green-500 to-emerald-500"
  }
])
</script>

