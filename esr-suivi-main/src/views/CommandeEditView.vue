<template>
  <div class="flex items-center justify-center py-5

   ">
    <div class="p-6 max-w-2xl w-full bg-[#131326]/80 text-white rounded-xl shadow-xl backdrop-blur-lg border border-gray-700">
      
      <h2 class="text-2xl font-semibold mb-6 border-b border-gray-700 pb-3">Modifier le bon de commande</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- Fournisseur + Type ciment -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Fournisseur</label>
            <input
              v-model="form.fournisseur"
              type="text"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: NOCIBE SA"
              required
            />
          </div>
          <div>
            <label class="block font-medium mb-1">Type de ciment</label>
            <select
              v-model="form.type_ciment"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner...</option>
              <option value="325">325</option>
              <option value="425">425</option>
            </select>
          </div>
        </div>

        <!-- Quantité + Montant -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Quantité (T)</label>
            <input
              v-model.number="form.quantite"
              type="number"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 25"
              required
            />
          </div>
          <div>
            <label class="block font-medium mb-1">Montant (FCFA)</label>
            <input
              v-model.number="form.montant_ciment"
              type="number"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 1479050"
              required
            />
          </div>
        </div>

        <!-- Chauffeur + Numéro camion -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Chauffeur</label>
            <input
              v-model="form.nom_chauffeur"
              type="text"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: ZINSOU T. Jérémie"
              required
            />
          </div>
          <div>
            <label class="block font-medium mb-1">Numéro du camion</label>
            <input
              v-model="form.num_camion"
              type="text"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: CF04182"
              required
            />
          </div>
        </div>

        <!-- Permis + Destination -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Numéro du permis</label>
            <input
              v-model="form.num_permis"
              type="text"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 13927832"
              required
            />
          </div>
          <div>
            <label class="block font-medium mb-1">Destination</label>
            <input
              v-model="form.destination"
              type="text"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: KETOU"
              required
            />
          </div>
        </div>

        <!-- Date + Statut -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Date de commande</label>
            <input
              v-model="form.date"
              type="date"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block font-medium mb-1">Statut</label>
            <select
              v-model="form.statut"
              class="w-full bg-[#20203D]/80 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en_attente">En attente</option>
              <option value="en_route">En route</option>
              <option value="livrer">Livrée</option>
            </select>
          </div>
        </div>

        <!-- Boutons -->
        <div class="flex justify-end gap-4 pt-4">
          <button @click.prevent="cancel" type="button" class="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded">Annuler</button>
          <button type="submit" class="bg-gradient-to-r from-emerald-600 to-lime-600 rounded-lg text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/30 transform px-5 py-2">Enregistrer</button>
        </div>

      </form>
    </div>
  </div>
</template>


<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCommandeStore } from '@/stores/commandeStore'

const router = useRouter()
const route = useRoute()
const store = useCommandeStore()

const id = parseInt(route.params.id)

const form = reactive({
  id: id,
  fournisseur: '',
  type_ciment: '',
  quantite: null,
  montant_ciment: null,
  nom_chauffeur: '',
  num_camion: '',
  num_permis: '',
  destination: '',
  date: new Date().toISOString().slice(0, 10),
  statut: 'en_attente'
})

onMounted(async () => {
  const existing = store.getCommande(id)
  if (existing) {
    Object.assign(form, existing)
  } else {
    // try to fetch from API if not present locally
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
      const res = await fetch(`${API_URL}/commandes/${id}`)
      if (res.ok) {
        const data = await res.json()
        Object.assign(form, data)
      }
    } catch (e) {
      console.error('Could not load commande', e)
    }
  }
})

const handleSubmit = async () => {
  try {
    await store.updateCommande(id, form);
    router.push('/commandes')
  } catch (e) {
    console.error('Erreur lors de la modification', e)
  }
}

const cancel = () => router.back()
</script>

<style scoped>
/* small form styles kept simple */
</style>
