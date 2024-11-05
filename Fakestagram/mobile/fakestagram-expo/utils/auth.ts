import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token', error);
    return null;
  }
};

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.error('Error getting userId', error);
    return null;
  }
};