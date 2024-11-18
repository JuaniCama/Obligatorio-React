import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { API_BASE_URL , AUTH_ENDPOINT} from '../constants/constants';
import { useRouter } from 'expo-router';

const RegisterScreenComponent = ({}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const register = async () => {
    try {
      const response = await axios.post(`${AUTH_ENDPOINT}/register`, { username, email, password });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', response.data._id);
      router.push('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error al registrarse', 'Por favor verifica los datos.');
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>Registro</Text>

      <Text>Nombre de Usuario</Text>
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <Text>Correo Electrónico</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Text>Contraseña</Text>
      <TextInput
        placeholder="Contraseña"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button title="Registrarse" onPress={register} />
      <Text onPress={() => router.push('/(auth)/login')} style={styles.link}>
        Iniciar sesión
      </Text>
    </View>
  );
};

export default RegisterScreenComponent;