<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">
        Détail du bon de commande #{{ commande.id }}
      </h1>
      <router-link
        to="/dashboard"
        class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        ← Retour
      </router-link>
    </div>

    <!-- Informations principales -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-3 text-gray-700">Informations Client</h2>
        <p><strong>Nom du client :</strong> {{ commande.client }}</p>
        <p><strong>Téléphone :</strong> {{ commande.telephone }}</p>
        <p><strong>Ville de livraison :</strong> {{ commande.villeLivraison }}</p>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-3 text-gray-700">Détails Commande</h2>
        <p><strong>Date :</strong> {{ commande.date }}</p>
        <p><strong>Produit :</strong> {{ commande.produit }}</p>
        <p><strong>Quantité :</strong> {{ commande.quantite }} sacs</p>
        <p><strong>Prix Unitaire :</strong> {{ formatPrix(commande.prixUnitaire) }}</p>
        <p><strong>Prix Total :</strong> {{ formatPrix(commande.prixTotal) }}</p>
      </div>
    </div>

    <!-- Suivi de l’état -->
    <div class="bg-white p-4 rounded-lg shadow mb-8">
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Suivi de la commande</h2>
      <div class="flex items-center justify-between">
        <div
          v-for="(step, index) in etapes"
          :key="step"
          class="flex flex-col items-center relative"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="[
              index <= etapes.indexOf(commande.etat)
                ? 'bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500'
            ]"
          >
            {{ index + 1 }}
          </div>
          <span class="text-sm mt-2 text-gray-600">{{ step }}</span>

          <div
            v-if="index < etapes.length - 1"
            class="absolute top-4 left-8 w-24 h-1"
            :class="[
              index < etapes.indexOf(commande.etat)
                ? 'bg-green-600'
                : 'bg-gray-300'
            ]"
          ></div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-4">
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Modifier
      </button>
      <button
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Marquer comme livré
      </button>
      <button
        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
      >
        Supprimer
      </button>
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
