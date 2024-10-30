import axios from 'axios';
import { API_BASE_URL,POSTS_ENDPOINT,AUTH_ENDPOINT } from '../constants/constants';

const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 10000,
});

export default api;