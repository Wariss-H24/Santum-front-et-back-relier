import { defineStore } from 'pinia'
import { ref } from 'vue'
import { commandes as initialData } from '@/data/commandes'

export const useCommandeStore = defineStore('commandeStore', () => {
  const commandes = ref([...initialData])

  const addCommande = (commande) => {
    commande.id = commandes.value.length + 1
    commande.numero = 'BC-' + String(commande.id).padStart(3, '0')
    commandes.value.push(commande)
  }

  const getCommande = (id) => commandes.value.find(c => c.id === parseInt(id))
  const updateStatut = (id, statut) => {
    const cmd = getCommande(id)
    if (cmd) cmd.statut = statut
  }

  return { commandes, addCommande, getCommande, updateStatut }
})
