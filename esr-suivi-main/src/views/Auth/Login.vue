<script setup>
import { ref } from 'vue';

const status = ref(null);

const form = ref({
    email: '',
    password: '',
});

const isLoading = ref(false);

const submit = async () => {
    try {
        isLoading.value = true;

        // Exemple d'appel API (à adapter)
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.value),
        });

        const data = await res.json();

        if (!res.ok) {
            status.value = data.message || "Erreur de connexion";
            return;
        }

        status.value = "Connexion réussie !";
        console.log("Utilisateur connecté :", data);

        // Redirection manuelle
        window.location.href = "/dashboard";

    } catch (error) {
        console.error(error);
        status.value = "Erreur serveur";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 px-4">
        <div class="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <!-- SECTION GAUCHE (Image) -->
            <div class="hidden md:flex w-1/2 bg-gradient-to-br from-green-500 to-gray-600 items-center justify-center p-8">
                <img
                    src="/images/Logo-SRBenin-principal_320.jpg"
                    alt="Logo"
                    class="w-48 h-48 object-contain rounded-full bg-white shadow-md"
                />
            </div>

            <!-- SECTION DROITE (Formulaire) -->
            <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Connexion</h1>

                <div v-if="status" class="mb-4 font-medium text-sm text-green-600 text-center">
                    {{ status }}
                </div>

                <form @submit.prevent="submit" class="space-y-5">
                    <!-- Email -->
                    <div>
                        <label for="email" class="text-gray-700 font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            class="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            v-model="form.email"
                            required
                        />
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="password" class="text-gray-700 font-medium">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            class="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            v-model="form.password"
                            required
                        />
                    </div>

                    <!-- Bouton de connexion -->
                    <div class="flex items-center justify-center mt-6">
                        <button
                            type="submit"
                            class="px-8 py-3 rounded-lg bg-gradient-to-br from-green-500 to-gray-600 hover:opacity-90 text-white font-semibold transition duration-200 ease-in-out"
                            :disabled="isLoading"
                            :class="{ 'opacity-50': isLoading }"
                        >
                            {{ isLoading ? "Connexion..." : "Se connecter" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
