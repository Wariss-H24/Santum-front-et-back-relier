<template>

  <!-- <div>
    <h2>Infos utilisateur</h2>

    <p><strong>Token :</strong> {{ data.token }}</p>
    <p><strong>Type :</strong> {{ data.token_type }}</p>

    <h3>Détails de l'utilisateur</h3>
    <p><strong>ID :</strong> {{ data.user.id }}</p>
    <p><strong>Nom :</strong> {{ data.user.name }}</p>
    <p><strong>Email :</strong> {{ data.user.email }}</p>
    <p><strong>Rôle :</strong> {{ data.user.role }}</p>
  </div> -->
  <div class="p-4 md:p-8">
    
    <h2 class="text-3xl font-light text-white border-l-4 border-[#4C70FF] pl-4 mb-10 tracking-wider">
      Tableau de Bord
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      
      <div
        v-for="card in statsCards"
        :key="card.label"
        class="bg-[#131326] rounded-xl shadow-2xl p-5 flex items-center gap-4 
               transition-all duration-300 transform hover:scale-[1.02] cursor-pointer 
               border border-[#20203D]"
      >
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl 
                 shadow-lg"
          :class="[
            card.bg,
            card.label.includes('Chiffre d') ? 'shadow-blue-500/50' : 
            card.label.includes('Commandes') ? 'shadow-indigo-500/50' : 
            'shadow-gray-500/50'
          ]"
        >
          <component :is="card.icon" class="w-8 h-8" />
        </div>

        <div>
          <h3 class="text-4xl font-extrabold text-white">{{ card.value }}</h3>
          <p class="text-gray-400 text-sm mt-0.5">{{ card.label }}</p>

          <div class="flex items-center gap-1 text-green-400 text-xs mt-2">
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

    <hr class="border-t border-[#20203D] my-10" />

    <div class="bg-[#131326] rounded-xl shadow-2xl p-6 md:p-8">
      
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-white">Dernières Commandes</h3>
        <RouterLink
          to="/commandes"
          class="text-[#4C70FF] hover:text-indigo-400 hover:underline text-sm font-medium transition duration-150"
        >
          Voir tout →
        </RouterLink>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-white">
          <thead class="bg-[#20203D]">
            <tr class="text-left text-xs text-gray-400 uppercase tracking-wider">
              <th class="p-4 rounded-tl-lg">Numéro</th>
              <th class="p-4">Chauffeur</th>
              <th class="p-4">Destination</th>
              <th class="p-4 rounded-tr-lg">Statut</th>
            </tr>
          </thead>
          
          <tbody>
            <tr
              v-for="cmd in lastCommandes"
              :key="cmd.id"
              class="border-b border-[#20203D] hover:bg-[#20203D]/50 transition duration-150"
            >
              <td class="p-4 font-medium text-white">{{ cmd.numero }}</td>
              <td class="p-4 text-gray-300">{{ cmd.nom_chauffeur }}</td>
              <td class="p-4 text-gray-300">{{ cmd.destination }}</td>
              
              <td class="p-4">
                <span
                  :class="{
                    'bg-yellow-800/50 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold': cmd.statut === 'en_attente',
                    'bg-blue-800/50 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold': cmd.statut === 'en_route',
                    'bg-green-800/50 text-green-300 px-3 py-1 rounded-full text-xs font-semibold': cmd.statut === 'livree'
                  }"
                >
                  {{ cmd.statut.replace('_', ' ').toUpperCase() }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-if="lastCommandes?.length === 0" class="text-center text-gray-500 py-6">
        Aucune commande récente à afficher.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useCommandeStore } from "@/stores/commandeStore"

// Icônes Lucide
import { Package, Users, Truck, CheckCircle } from "lucide-vue-next"

const store = useCommandeStore()

const total = computed(() => store.commandes.length)
const enAttente = computed(() => store.commandes.filter(c => c.statut === "en_attente").length)
const enRoute = computed(() => store.commandes.filter(c => c.statut === "en_route").length)
const livrees = computed(() => store.commandes.filter(c => c.statut === "livree").length)
// const authStore = useAuthStore() 
// Initialiser le store d'authentification




// Lier 'data' aux données du store (en lecture seule)
// const data = computed(() => ({
//   token: authStore.token,
//   token_type: authStore.tokenType,
//   user: authStore.user
// }));

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

