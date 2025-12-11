<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Créer un bon de commande</h2>

    <form @submit.prevent="handleSubmit" 
      class="space-y-4 bg-white text-black shadow rounded p-6">

      <!-- Ligne 1 : Fournisseur + Type ciment -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <!-- Ligne 2 : Quantité + Montant ciment -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-1">Quantité (Tonnes)</label>
          <input
            v-model.number="form.quantite"
            type="number"
            class="w-full border rounded px-3 py-2"
            placeholder="Ex: 25"
            required
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Montant ciment (FCFA)</label>
          <input
            v-model.number="form.montant_ciment"
            type="number"
            class="w-full border rounded px-3 py-2"
            placeholder="Ex: 1479050"
            required
          />
        </div>
      </div>

      <!-- Ligne 3 : Chauffeur + Num camion -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <!-- Ligne 4 : Num permis + Destination -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <!-- Ligne 5 : Date -->
      <div>
        <label class="block font-medium mb-1">Date de commande</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <!-- Bouton -->
      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>

    </form>
  </div>
</template>


<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCommandeStore } from '@/stores/commandeStore'

const router = useRouter()
const store = useCommandeStore()

//pour fermer le modal
const emit = defineEmits(['close'])

const form = reactive({
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
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  
const handleSubmit = async () => {
  try {
    const res = await fetch(`${API_URL}/commandes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    const data = await res.json()

    store.addCommande(data)

     //⬇FERMETURE AUTOMATIQUE DU FORMULAIRE
    emit('close')

  } catch (error) {
    console.error('Erreur :', error)
  }
}

</script>
