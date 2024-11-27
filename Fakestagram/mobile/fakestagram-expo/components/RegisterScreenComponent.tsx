import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { AUTH_ENDPOINT } from '../constants/constants';
import { useRouter } from 'expo-router';

const RegisterScreenComponent = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const register = async () => {
    try {
      const response = await axios.post(`${AUTH_ENDPOINT}/register`, { username, email, password });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', response.data._id);
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error al registrarse', 'Por favor verifica los datos.');
    }
  };

  return (
    <View style={styles.authContainer}>
      <Image source={require('../assets/logo.png')} style={styles.loginLogo} />
      <Text style={styles.authTitle}>Registro</Text>

      <View style={styles.loginInputContainer}>
        <Text style={styles.inputLabel}>Nombre de usuario</Text>
        <TextInput
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.loginInput}
        />
        <Text style={styles.inputLabel}>Correo electrónico</Text>
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.loginInput}
        />
        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          placeholder="Contraseña"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.loginInput}
        />
      </View>

      <TouchableOpacity onPress={register} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.loginCreateAccountText}>
        ¿Ya tienes una cuenta?{' '}
        <Text onPress={() => router.push('/(auth)/login')} style={styles.loginCreateAccountLink}>
          Iniciar sesión
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreenComponent;