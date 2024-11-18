import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { API_BASE_URL, AUTH_ENDPOINT } from '../constants/constants';
import { useRouter } from 'expo-router';

const LoginScreenComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      const response = await axios.post(`${AUTH_ENDPOINT}/login`, { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', response.data._id); // Asegúrate de guardar el userId
      router.push('/(tabs)/home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error de autenticación:', error.response?.data || error.message);
        Alert.alert('Error al iniciar sesión', error.response?.data?.message || 'Credenciales incorrectas.');
      } else {
        console.error('Error desconocido:', error);
        Alert.alert('Error al iniciar sesión', 'Ocurrió un error desconocido. Intenta de nuevo.');
      }
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Image source={require('../assets/logo.png')} style={styles.loginLogo} />
      <Text style={styles.loginAppTitle}>Fakestagram</Text>

      <View style={styles.loginInputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.loginInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.loginInput}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={login} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.loginCreateAccountText}>
        Don't have an account?{' '}
        <Text onPress={() => router.push('/(auth)/register')} style={styles.loginCreateAccountLink}>
          Create one
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreenComponent;