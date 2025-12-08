<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Liste des Bons de Commande</h2>
      <button
        @click="openCommandeForm"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Nouveau bon
      </button>
    </div>

    <!-- TABLE -->
    <table class="min-w-full bg-white dark:bg-gray-900 shadow rounded overflow-hidden">
      <thead class="bg-gray-100 dark:bg-gray-800">
        <tr class="text-left">
          <th class="p-3">Numéro</th>
          <th class="p-3">Chauffeur</th>
          <th class="p-3">Destination</th>
          <th class="p-3">Quantité</th>
          <th class="p-3">Statut</th>
          <th class="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cmd in commandes" :key="cmd.id" class="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
          <td class="p-3">{{ cmd.numero }}</td>
          <td class="p-3">{{ cmd.nom_chauffeur }}</td>
          <td class="p-3">{{ cmd.destination }}</td>
          <td class="p-3">{{ cmd.quantite }} T</td>
          <td class="p-3">
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
          <td class="p-3 text-right">
            <RouterLink :to="`/commandes/${cmd.id}`" class="text-blue-600 hover:underline">
              Détails
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- POPUP / MODAL -->
    <div
      v-if="commandesForm"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-[90%] max-w-2xl p-6 relative">
        
        <!-- Close button -->
        <button
          @click="closeCommandeForm"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          ✕
        </button>

        <BonCommandeForm />
      </div>
    </div>

  </div>
</template>

<script setup>
import BonCommandeForm from '@/components/forms/BonCommandeForm.vue'
import { useCommandeStore } from '@/stores/commandeStore.js'
import { ref } from 'vue'

const store = useCommandeStore()
const commandes = store.commandes
const commandesForm = ref(false)

const openCommandeForm = () => {
  commandesForm.value = true
}

const closeCommandeForm = () => {
  commandesForm.value = false
}
</script>
