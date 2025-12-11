import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../utils/axiosConfig.js'
export const useCommandeStore = defineStore('commandeStore', () => {
  const commandes = ref([])
  const loading = ref(false)
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

  // Charger toutes les commandes depuis Laravel
  const fetchCommandes = async () => {
    loading.value = true

    const res = await fetch(`${API_URL}/commandes`)
    const data = await res.json()
    // SI TON API RENVOIE { data: [...] }
    commandes.value = data.data ?? data
    loading.value = false
    // return data
  }

  // Ajouter une commande à la BD puis au store
  const addCommande = (commande) => {
    commandes.value.push(commande)
  }

  // Trouver une commande
  const getCommande = (id) => commandes.value.find(c => c.id == id)

  // Modifier un statut
  const updateStatut = (id, statut) => {
    const cmd = getCommande(id)
    if (cmd) cmd.statut = statut
  }

  // Modifier une commande
  const updateCommande = async (id, updatedData) => {
  try {
    const res = await fetch(`${API_URL}/commandes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    const data = await res.json();
    
    // mettre à jour le store
    const index = commandes.value.findIndex(c => c.id == id);
    if (index !== -1) commandes.value[index] = data;
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
  }
}


  // Supprimer une commande
  const deleteCommande = async (id) => {
    try {
      await fetch(`${API_URL}/commandes/${id}`, { method: 'DELETE' })
      commandes.value = commandes.value.filter(c => c.id != id)
    } catch (error) {
      console.error("Erreur lors de la suppression :", error)
    }
  }


  return { commandes, loading, fetchCommandes, addCommande, getCommande, updateCommande, updateStatut, deleteCommande }
})
