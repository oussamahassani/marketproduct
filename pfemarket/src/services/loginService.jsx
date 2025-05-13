import axios from 'axios';
import {API_Base_URL} from './constant'


const API_URL = `${API_Base_URL}/api/auth/`;




// Fonction pour se connecter
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, {
      username,
      password,
    });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Erreur de connexion : ", error);
    throw error;
  }
};

// Fonction pour s'inscrire (Sign Up)
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}register`, {
    ...data
    });

    if (response.data) {
      return response.data; // Par exemple, renvoyer un message de succès ou un token
    }
  } catch (error) {
    console.error("Erreur d'inscription : ", error);
    throw error;
  }
};




// Autres fonctions pour le service d'authentification (ex : logout, register) peuvent être ajoutées ici
export  const logout = () => {
  // Par exemple, on peut supprimer le token stocké localement lors de la déconnexion
  localStorage.removeItem('role');
  localStorage.remove('token')
};


