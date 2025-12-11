<script setup>
import BonCommandeForm from '@/components/forms/BonCommandeForm.vue'
import { useCommandeStore } from '@/stores/commandeStore.js'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const store = useCommandeStore()
const { commandes, loading } = storeToRefs(store)

const commandesForm = ref(false)

const openCommandeForm = () => commandesForm.value = true
const closeCommandeForm = () => commandesForm.value = false

const confirmDelete = async (id) => {
  if (!confirm('Confirmer la suppression du bon de commande ?')) return
  await store.deleteCommande(id);
}

onMounted(async () => {
  await store.fetchCommandes()
})
</script>

<template>
  <div class="p-8">
    
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-100">
      <h2 class="text-3xl font-light pl-4 tracking-wider">Liste des Bons de Commande</h2>
      
      <button
        @click="openCommandeForm"
        class="relative px-6 py-3 rounded-lg font-semibold text-white overflow-hidden 
               transition-all duration-300 ease-in-out z-0 group custom-gradient-btn"
      >
        <span class="absolute inset-0 transition-all duration-300 ease-in-out z-[-1] custom-gradient"></span>
        <span class="relative z-10">+ Nouveau bon</span>
      </button>
    </div>

    <!-- TABLE CONTAINER -->
    <div class="bg-[#131326] rounded-xl shadow-2xl overflow-hidden border border-[#20203D] mt-6">

      <!-- ⚡ LOADING SKELETON -->
      <div v-if="loading" class="p-6 space-y-4">
        <div v-for="i in 6" :key="i" class="animate-pulse flex justify-between items-center border-b border-[#20203D] py-3">
          <div class="h-4 w-24 bg-gray-700 rounded"></div>
          <div class="h-4 w-32 bg-gray-700 rounded"></div>
          <div class="h-4 w-40 bg-gray-700 rounded"></div>
          <div class="h-4 w-20 bg-gray-700 rounded"></div>
          <div class="h-4 w-16 bg-gray-700 rounded"></div>
        </div>
      </div>

      <!-- TABLE -->
      <table v-else class="min-w-full text-white">
        <thead class="bg-[#20203D] border-b border-[#20203D]">
          <tr class="text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
            <th class="p-4">Numéro</th>
            <th class="p-4">Chauffeur</th>
            <th class="p-4">Destination</th>
            <th class="p-4">Quantité</th>
            <th class="p-4">Statut</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr 
            v-for="cmd in commandes" 
            :key="cmd.id" 
            class="border-b border-[#20203D] hover:bg-[#20203D]/50 transition duration-150"
          >
            <td class="p-4 font-medium">{{ cmd.numero_commande }}</td>
            <td class="p-4 text-gray-300">{{ cmd.nom_chauffeur }}</td>
            <td class="p-4 text-gray-300">{{ cmd.destination }}</td>
            <td class="p-4 text-gray-300">{{ cmd.quantite }} T</td>

            <td class="p-4">
              <span
                :class="{
                  'bg-yellow-800/50 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold': cmd.statut === 'en_attente',
                  'bg-blue-800/50 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold': cmd.statut === 'en_route',
                  'bg-green-800/50 text-green-300 px-3 py-1 rounded-full text-xs font-semibold': cmd.statut === 'livrer'
                }"
              >
                {{ cmd.statut.replace('_', ' ').toUpperCase() }}
              </span>
            </td>

            <td class="p-4 text-right">
              <div class="flex items-center justify-end gap-4">
                <RouterLink :to="`/commandes/${cmd.id}/edit`" class="text-green-400 hover:text-green-200">
                  Modifier
                </RouterLink>

                <RouterLink :to="`/commandes/${cmd.id}`" class="text-blue-400 hover:text-blue-200">
                  Détails
                </RouterLink>

                <button @click.prevent="confirmDelete(cmd.id)" class="text-red-400 hover:text-red-200">
                  Supprimer
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <div
      v-if="commandesForm"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-[#131326] text-white rounded-xl shadow-2xl w-[90%] max-w-2xl p-6 relative border border-[#20203D]">
        
        <button
          @click="closeCommandeForm"
          class="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200 text-xl"
        >
          ✕
        </button>

        <h3 class="text-xl font-semibold mb-4 border-b border-[#20203D] pb-3">Créer un Bon de Commande</h3>

        <BonCommandeForm @close="closeCommandeForm" />
      </div>
    </div>

  </div>
</template>


<style scoped>
.custom-gradient {
  background: linear-gradient(135deg, #4C70FF 0%, #00f0ff 25%, #4C70FF 50%, #8aff7c 75%, #000000 100%);
  background-size: 300% 300%;
  animation: gradient-shift 10s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.custom-gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 112, 255, 0.5);
}

.custom-gradient-btn:hover .relative {
  transform: translateY(0);
}
</style>

<style scoped>
/* Dégradé demandé : Bleu, Jaune, Vert, Noir. J'ai interprété pour un look pro. */
.custom-gradient {
  /* Le dégradé qui s'applique sur le bouton */
  background: linear-gradient(135deg, #4C70FF 0%, #00f0ff 25%, #4C70FF 50%, #8aff7c 75%, #000000 100%);
  background-size: 300% 300%;
  animation: gradient-shift 10s ease infinite; /* Animation du dégradé subtile */
}

/* Animation du dégradé (optionnel, donne un effet "vivant") */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Effet de Glissement vers le haut au survol (bouton) */
.custom-gradient-btn:hover {
  /* Fait glisser la boîte légèrement vers le haut (pour l'effet d'élévation) */
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 112, 255, 0.5); /* Ombre plus forte et bleue */
}

/* S'assurer que le texte ne bouge pas trop */
.custom-gradient-btn:hover .relative {
  transform: translateY(0); /* Le texte ne bouge pas au survol */
}
</style>


