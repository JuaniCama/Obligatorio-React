import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from '../styles/styles';
import { RootStackParamList } from '../types';
import { API_BASE_URL,POSTS_ENDPOINT,AUTH_ENDPOINT } from './constants';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 4) {
      Alert.alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        email,
        password,
      });
      Alert.alert('Usuario registrado con éxito');

      const userId = response.data.user?._id || 'defaultUserId';
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', userId);
      navigation.navigate('Feed');
    } catch (err) {
      console.error(err);
      Alert.alert('Error al registrar el usuario');
    }
  };

  const login = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 4) {
      Alert.alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const userId = response.data.user?._id || 'defaultUserId';
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', userId);
      navigation.navigate('Feed');
    } catch (err) {
      console.error('Error en el login:', err);
      Alert.alert('Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.authTitle}>{isRegistering ? 'Registro' : 'Login'}</Text>

      {isRegistering && (
        <View>
          <Text>Nombre de Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      )}

      <View>
        <Text>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View>
        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <Button
        title={isRegistering ? 'Registrarse' : 'Iniciar sesión'}
        onPress={isRegistering ? register : login}
      />

      <Text
        style={styles.link}
        onPress={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión aquí' : '¿No tienes cuenta? Regístrate aquí'}
      </Text>
    </View>
  );
};

export default Auth;
