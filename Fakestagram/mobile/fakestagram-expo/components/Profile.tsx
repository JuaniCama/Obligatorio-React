import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from '../styles/styles';
import { RootStackParamList } from '../types'; 

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const logout = async () => {
    await AsyncStorage.removeItem('token'); // Eliminar el token de autenticación
    navigation.navigate('Auth'); // Navegar a la pantalla de autenticación
  };

  return (
    <View style={styles.container}>
      <Text style={styles.authTitle}>Este es el perfil</Text>
      <Button title="Ir al Feed" onPress={() => navigation.navigate('Feed')} />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
};

export default Profile;
