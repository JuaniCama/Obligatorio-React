import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const likePost = async (postId: string) => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token. Inicia sesión nuevamente.');
  }

  await axios.post(`${API_BASE_URL}/api/posts/${postId}/like`, {}, {
    headers: { "Authorization": `Bearer ${token}` }
  });
};

export const unlikePost = async (postId: string) => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token. Inicia sesión nuevamente.');
  }

  await axios.delete(`${API_BASE_URL}/api/posts/${postId}/like`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
};