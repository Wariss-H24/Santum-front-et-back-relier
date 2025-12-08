<script setup>
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register" />

    <form @submit.prevent="submit" class="">
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input
                id="name"
                type="text"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="form.name"
                required
                autofocus
                autocomplete="name"
            />
            <span v-if="form.errors.name" class="text-red-500 text-sm mt-2">{{ form.errors.name }}</span>
        </div>

        <div class="mt-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
                id="email"
                type="email"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="form.email"
                required
                autocomplete="username"
            />
            <span v-if="form.errors.email" class="text-red-500 text-sm mt-2">{{ form.errors.email }}</span>
        </div>

        <div class="mt-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
                id="password"
                type="password"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="form.password"
                required
                autocomplete="new-password"
            />
            <span v-if="form.errors.password" class="text-red-500 text-sm mt-2">{{ form.errors.password }}</span>
        </div>

        <div class="mt-4">
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmation du mot de passe</label>
            <input
                id="password_confirmation"
                type="password"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="form.password_confirmation"
                required
                autocomplete="new-password"
            />
            <span v-if="form.errors.password_confirmation" class="text-red-500 text-sm mt-2">{{ form.errors.password_confirmation }}</span>
        </div>

        <div class="flex items-center justify-end mt-4">
            <button
                type="submit"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-25 transition ease-in-out duration-150"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing">
                    Register
            </button>
        </div>
    </form>
</template>

<style scoped>
.bg-white {
    background-color: white;
}

.text-red-500 {
    color: #f56565;
}
</style>
