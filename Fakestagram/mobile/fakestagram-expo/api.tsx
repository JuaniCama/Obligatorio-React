import axios from 'axios';
import { API_BASE_URL,POSTS_ENDPOINT,AUTH_ENDPOINT } from './components/constants';

// Aquí defines la URL base de tu backend.
const api = axios.create({
  baseURL: `${API_BASE_URL}`,  // Cambiar esta URL según donde corras el backend, hay que usar la de la pc. No sirve localhost
  timeout: 10000,
});

export default api;