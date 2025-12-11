<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Modifier le bon de commande</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4 bg-white text-black shadow rounded p-6">

      <!-- Fournisseur -->
      <div>
        <label class="block font-medium mb-1">Fournisseur</label>
        <input
          v-model="form.fournisseur"
          type="text"
          class="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          placeholder="Ex: NOCIBE SA"
          required
        />
      </div>

      <!-- Type de ciment -->
      <div>
        <label class="block font-medium mb-1">Type de ciment</label>
        <select
          v-model="form.type_ciment"
          class="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Sélectionner...</option>
          <option value="325">325</option>
          <option value="425">425</option>
        </select>
      </div>

      <!-- Quantité -->
      <div>
        <label class="block font-medium mb-1">Quantité (en tonnes)</label>
        <input
          v-model.number="form.quantite"
          type="number"
          class="w-full border rounded px-3 py-2"
          placeholder="Ex: 25"
          required
        />
      </div>

      <!-- Montant ciment -->
      <div>
        <label class="block font-medium mb-1">Montant Ciment (FCFA)</label>
        <input
          v-model.number="form.montant_ciment"
          type="number"
          class="w-full border rounded px-3 py-2"
          placeholder="Ex: 1479050"
          required
        />
      </div>

      <!-- Chauffeur -->
      <div>
        <label class="block font-medium mb-1">Nom du chauffeur</label>
        <input
          v-model="form.nom_chauffeur"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Ex: ZINSOU T. Jérémie"
          required
        />
      </div>

      <!-- Numéro de camion -->
      <div>
        <label class="block font-medium mb-1">Numéro du camion</label>
        <input
          v-model="form.num_camion"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Ex: CF04182"
          required
        />
      </div>

      <!-- Numéro de permis -->
      <div>
        <label class="block font-medium mb-1">Numéro du permis</label>
        <input
          v-model="form.num_permis"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Ex: 13927832"
          required
        />
      </div>

      <!-- Destination -->
      <div>
        <label class="block font-medium mb-1">Destination</label>
        <input
          v-model="form.destination"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Ex: KETOU"
          required
        />
      </div>

      <!-- Date -->
      <div>
        <label class="block font-medium mb-1">Date de commande</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <!-- Statut -->
      <div>
        <label class="block font-medium mb-1">Statut</label>
        <select v-model="form.statut" class="w-full border rounded px-3 py-2">
          <option value="en_attente">En attente</option>
          <option value="en_route">En route</option>
          <option value="livrer">Livrée</option>
        </select>
      </div>

      <!-- Bouton -->
      <div class="flex justify-between pt-4">
        <button @click.prevent="cancel" type="button" class="bg-gray-300 px-6 py-2 rounded">Annuler</button>
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer les modifications
        </button>
      </div>

    </form>
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
