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
    try {
      const res = await api.get('/commandes') // baseURL est déjà défini
      commandes.value = res.data.data ?? res.data
    } catch (error) {
      console.error("Erreur lors du fetch des commandes :", error)
    } finally {
      loading.value = false
    }
  }

  // Ajouter une commande à la BD puis au store
  const addCommande = (commande) => {
    commandes.value.push(commande)
  }

  // Trouver une commande
  const getCommande =(id) => commandes.value.find(c => c.id == id)

  // Modifier un statut
  // const changeStatut = async (id, statut) => {
  // try {
    // Appel à l'API pour modifier le statut
    // const { data } = await api.patch(`/commandes/${id}`, { statut })

    // Mise à jour locale
//     updateStatut(id, data.statut)
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour du statut :', error)
//   }
// }

  const updateStatut = (id, statut) => {
    const cmd = getCommande(id)
    if (cmd) cmd.statut = statut
  }

  // Modifier une commande
  const updateCommande = async (id, updatedData) => {
    try {
      const res = await api.put(`/commandes/${id}`, updatedData)
      const data = res.data
      // mettre à jour le store
      const index = commandes.value.findIndex(c => c.id == id)
      if (index !== -1) commandes.value[index] = data
    } catch (error) {
      console.error("Erreur lors de la modification :", error)
    }
  }



  // Supprimer une commande
  const deleteCommande = async(id) => {
    try {
      await api.delete(`/commandes/${id}`)
      // mettre à jour le store
      commandes.value = commandes.value.filter(c => c.id != id)
    } catch (error) {
      console.error("Erreur lors de la suppression :", error)
    }
  }


  return { commandes, loading, fetchCommandes, addCommande, getCommande, updateCommande, updateStatut, deleteCommande }
})
