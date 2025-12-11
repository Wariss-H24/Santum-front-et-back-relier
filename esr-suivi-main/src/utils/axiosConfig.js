import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }
});

//Interceptor de requête pour ajouter le token d'authentification
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
 if(!token){
  router.replace({name : 'login'});
 }

 config.headers.['Authorization'] = `Bearer ${token}`;
  return config;
});


// Intercepteur de réponses : gérer les erreurs 401 (token expiré)
api.interceptors.response.use(
  response => response, // Si la réponse est correcte, la retourner directement
  async error => {
    if (error.response?.status === 401) { // Vérifier si l'erreur est une erreur 401
      const message = error.response.data.message || ''; // Récupérer le message d'erreur (s'il existe)
      
      // Si le message inclut "expired" ou "unauthenticated", cela signifie que le token a expiré ou que l'utilisateur n'est pas authentifié
      if (message.toLowerCase().includes('expired') || message.toLowerCase().includes('unauthenticated')) {
        // Supprimer le token et les informations utilisateur stockées dans sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        // Rediriger l'utilisateur vers la page de connexion
        router.push({ name: 'login' });
      }
    }
    
    // Retourner l'erreur pour qu'elle soit gérée ailleurs si nécessaire
    return Promise.reject(error);
  }
);

export default api;