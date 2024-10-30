import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import styles from '../styles/styles';
import { API_BASE_URL } from '../constants/constants';

interface UserProfile {
  username: string;
  profilePicture: string;
  description: string;
  postCount: number;
  friendCount: number;
  posts: { id: string; imageUrl: string }[];
}

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      const userIdString = userId?.toString();

      if (!token || !userId) {
        Alert.alert('Error', 'No se encontró un token de autenticación.');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/user/profile/${userIdString}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserProfile(response.data);
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        Alert.alert('Sesión expirada', 'Por favor, inicia sesión nuevamente.', [
          {
            text: 'OK',
            onPress: () => router.push('/(auth)/login'),
          },
        ]);
      } else {
        console.error('Error al cargar el perfil:', error);
        Alert.alert('Error', 'No se pudo cargar el perfil.');
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    router.push('/(auth)/login');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text>No se pudo cargar el perfil del usuario.</Text>
      </View>
    );
  }

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.header}>
        <Image
          source={userProfile.profilePicture ? { uri: userProfile.profilePicture } : require('../assets/defaultProfile.png')}
          style={profileStyles.profileImage}
        />
        <Text style={profileStyles.username}>{userProfile.username}</Text>
        <Text style={profileStyles.description}>{userProfile.description}</Text>
        <View style={profileStyles.statsContainer}>
          <View style={profileStyles.stat}>
            <Text style={profileStyles.statNumber}>{userProfile.postCount}</Text>
            <Text style={profileStyles.statLabel}>Posts</Text>
          </View>
          <View style={profileStyles.stat}>
            <Text style={profileStyles.statNumber}>{userProfile.friendCount}</Text>
            <Text style={profileStyles.statLabel}>Friends</Text>
          </View>
        </View>
        <TouchableOpacity style={profileStyles.editProfileButton}>
          <Text style={profileStyles.editProfileText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
          <Text style={profileStyles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={userProfile.posts}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        numColumns={3}
        renderItem={({ item }) => {
          const imageUrl = `${API_BASE_URL}/${item.imageUrl.replace(/\\/g, '/')}`;
          return (
            <Image source={{ uri: imageUrl }} style={profileStyles.postImage} />
          );
        }}
        contentContainerStyle={profileStyles.postsContainer}
      />
    </View>
  );
};

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  editProfileButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  editProfileText: {
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
  },
  postsContainer: {
    paddingVertical: 10,
  },
  postImage: {
    width: '33%',
    aspectRatio: 1,
    margin: 1,
  },
});

export default ProfileScreen;
