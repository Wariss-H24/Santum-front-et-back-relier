<template>
  <div class="flex justify-center items-center">

    <div class="p-4 md:p-10 min-h-full text-white  rounded-xl shadow-2xl border " style="background-color: #1a1a2e;">
      
      <div class="flex justify-between items-center mb-10 border-b border-[#20203D] pb-4">
        
        <h1 class="text-3xl font-light text-white pl-4 tracking-wider" style="border-left: 4px solid #4C70FF;">
          Détail du Bon de Commande #{{ commande.id }}
        </h1>
        
        <router-link
          to="/dashboard"
          class="text-gray-300 px-4 py-2 rounded-md transition duration-200 text-sm font-medium border hover:bg-#33334d border-gray-700"
          style="background-color: #20203D;"
        >
          ← Retour
        </router-link>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        <div class="p-6 rounded-xl shadow-xl border" style="background-color: #131326; border-color: #20203D;">
          <h2 class="text-xl font-semibold mb-6 pb-3" style="color: #4C70FF; border-bottom: 1px solid #20203D;">Informations Client</h2>
          
          <p class="text-gray-300 my-3">
            <span class="inline-block w-32 font-medium">Nom du client :</span> 
            <span class="text-white">{{ commande.client }}</span>
          </p>
          <p class="text-gray-300 my-3">
            <span class="inline-block w-32 font-medium">Téléphone :</span> 
            <span class="text-white">{{ commande.telephone }}</span>
          </p>
          <p class="text-gray-300 my-3">
            <span class="inline-block w-32 font-medium">Ville de livraison :</span> 
            <span class="text-white">{{ commande.villeLivraison }}</span>
          </p>
        </div>
  
        <div class="p-6 rounded-xl shadow-xl border" style="background-color: #131326; border-color: #20203D;">
          <h2 class="text-xl font-semibold mb-6 pb-3" style="color: #4C70FF; border-bottom: 1px solid #20203D;">Détails Commande</h2>
          
          <div class="flex justify-between items-center text-gray-300 my-3">
            <span class="font-medium">Date :</span> 
            <span class="text-white">{{ commande.date }}</span>
          </div>
          <div class="flex justify-between items-center text-gray-300 my-3">
            <span class="font-medium">Produit :</span> 
            <span class="text-white">{{ commande.produit }}</span>
          </div>
          <div class="flex justify-between items-center text-gray-300 my-3">
            <span class="font-medium">Quantité :</span> 
            <span class="text-white font-semibold">{{ commande.quantite }} sacs</span>
          </div>
          <div class="flex justify-between items-center text-gray-300 my-3">
            <span class="font-medium">Prix Unitaire :</span> 
            <span class="font-semibold" style="color: #10B981;">{{ formatPrix(commande.prixUnitaire) }}</span> 
          </div>
          <div class="flex justify-between items-center text-gray-300 my-3 pt-3 mt-3" style="border-top: 1px solid #20203D;">
            <span class="font-bold">Prix Total :</span> 
            <span class="text-2xl font-extrabold" style="color: #00f0ff;">{{ formatPrix(commande.prixTotal) }}</span>
          </div>
        </div>
      </div>
  
      <div class="p-6 rounded-xl shadow-xl border" style="background-color: #131326; border-color: #20203D; margin-bottom: 40px;">
        <h2 class="text-xl font-semibold mb-8 pb-3" style="color: #4C70FF; border-bottom: 1px solid #20203D;">Suivi de la commande</h2>
        
        <div class="flex items-start justify-between relative w-full pt-4 pb-2">
          
          <div
            v-for="(step, index) in etapes"
            :key="step"
            class="flex flex-col items-center relative flex-1"
          >
            <div
              v-if="index < etapes.length - 1"
              class="absolute top-4 left-[calc(50%+16px)] h-1"
              :class="[
                // Bleu de progression
                index < etapes.indexOf(commande.etat) ? 'bg-blue-600' : 'bg-gray-700'
              ]"
              style="width: calc(100% - 32px); background-color: #4C70FF;"
            ></div>
            
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-20 transition-all duration-300"
              :class="[
                // Bleu actif
                index <= etapes.indexOf(commande.etat) ? 'text-white shadow-md shadow-blue-500/50' : 'text-gray-400'
              ]"
              :style="{ 
                  backgroundColor: index <= etapes.indexOf(commande.etat) ? '#4C70FF' : '#4b5563',
                  borderColor: index <= etapes.indexOf(commande.etat) ? '#4C70FF' : '#4b5563'
              }"
            >
              {{ index + 1 }}
            </div>
            
            <span class="text-xs mt-3 font-medium text-center max-w-[100px]"
                  :class="[index <= etapes.indexOf(commande.etat) ? 'text-white' : 'text-gray-500']">
                {{ step }}
            </span>
          </div>
        </div>
      </div>
  
      <div class="flex flex-wrap gap-4 mt-10">
        <button
          class="text-white px-6 py-3 rounded-lg font-semibold transition hover:bg-[#3b5cb7] duration-200 flex-1 min-w-[150px] shadow-lg"
          style="background-color: #4C70FF;" 
        >
          Modifier
        </button>
        
        <button
          class="text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0c8c62] transition duration-200 flex-1 min-w-[150px] shadow-lg"
          style="background-color: #10B981;" 
        >
          Marquer comme livré
        </button>
        
        <button
          class="text-white px-6 py-3 rounded-lg font-semibold transition hover:bg-[#cc3737]duration-200 flex-1 min-w-[150px] shadow-lg"
          style="background-color: #EF4444; "
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;

// Simuler une commande
const commande = ref({
  id,
  client: "Société BTP Nord",
  telephone: "+229 97 45 63 12",
  villeLivraison: "Parakou",
  produit: "Ciment Dangote",
  quantite: 250,
  prixUnitaire: 4800,
  prixTotal: 250 * 4800,
  date: "2025-11-13",
  etat: "En route",
});

const etapes = ["En attente", "Chargée", "En route", "Livrée"];

function formatPrix(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(value);
}
</script>

<style scoped>
/* Optionnel : animation légère du suivi */
</style>
