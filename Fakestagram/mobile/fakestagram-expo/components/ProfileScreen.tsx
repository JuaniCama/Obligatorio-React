import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, Alert, FlatList, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { API_BASE_URL } from '../constants/constants';
import * as ImagePicker from 'expo-image-picker';
import CustomEventEmitter from '../utils/CustomEventEmitter';

const screenWidth = Dimensions.get('window').width;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqqbk8dwo/image/upload';
const UPLOAD_PRESET = 'Fakestagram';

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { userId: routeUserId } = useLocalSearchParams();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    router.push('/(auth)/login');
  };

  const handleProfileTabPress = async () => {
    const perfilAVisitar = await AsyncStorage.getItem('perfilAVisitar');
    const isMyProfile = perfilAVisitar === null;
    setIsMyProfile(isMyProfile);
  };

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const perfilAVisitar = await AsyncStorage.getItem('perfilAVisitar');
      let idToUse = perfilAVisitar && perfilAVisitar !== '' ? perfilAVisitar : routeUserId;

      if (!token) {
        Alert.alert('Error', 'No se encontró un token de autenticación.');
        return;
      }

      if (!idToUse) {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          idToUse = userId;
        } else {
          Alert.alert('Error', 'No se encontró un ID de usuario válido.');
          return;
        }
      }

      const response = await axios.get(`${API_BASE_URL}/api/user/profile/${idToUse}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profileData = response.data;
      profileData.posts = profileData.posts.map((post) => ({
        ...post,
        imageUrl: `${API_BASE_URL}/${post.imageUrl.replace(/\\/g, '/')}`,
      }));

      setUserProfile(profileData);
      setUsername(profileData.user.username);
      setDescription(profileData.user.description);
      setProfilePicture(profileData.user.profilePicture);
      setProfilePictureUrl(profileData.user.profilePicture);
      setLoading(false);
      handleProfileTabPress();
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
      Alert.alert('Error', 'No se pudo cargar el perfil.');
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
      formData.append('upload_preset', UPLOAD_PRESET);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsUploading(false);
      console.log('Imagen subida a Cloudinary:', response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      setIsUploading(false);
      console.error('Error al subir la imagen a Cloudinary:', error);
      Alert.alert('Error', 'No se pudo subir la imagen.');
      throw error;
    }
  };

  const updateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró un token de autenticación.');
        return;
      }

      console.log('Actualizando perfil con:', {
        username,
        description,
        profilePicture: profilePictureUrl,
      });

      const body = {
        username: username,
        description: description,
        profilePicture: profilePictureUrl,
      }

      const response = await axios.put(`${API_BASE_URL}/api/user/profile/edit`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedProfile = response.data.user;
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        user: updatedProfile,
      }));
      setIsEditing(false);
      Alert.alert('Perfil actualizado', 'Tu perfil se ha actualizado exitosamente.');
      fetchProfileData();
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
        const uploadedImageUrl = await uploadImageToCloudinary(result.assets[0].uri);
        setProfilePictureUrl(uploadedImageUrl);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [routeUserId])
  );

  CustomEventEmitter.on('refresh', fetchProfileData);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar el perfil del usuario.</Text>
      </View>
    );
  }

  const postCount = userProfile.posts ? userProfile.posts.length : 0;
  const friendCount = userProfile.user.friends ? userProfile.user.friends.length : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={profilePicture ? { uri: profilePicture } : require('../assets/defaultProfile.png')}
          style={styles.profileImage}
        />
        {isEditing && isMyProfile && (
          <TouchableOpacity onPress={pickImageFromGallery} style={styles.changePhotoButton}>
            <Text style={styles.changePhotoButtonText}>Cambiar Foto</Text>
          </TouchableOpacity>
        )}
        {isEditing ? (
          <>
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            <TouchableOpacity onPress={updateProfile} style={styles.saveButton} disabled={isUploading}>
              {isUploading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Guardar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.username}>{userProfile.user.username}</Text>
            <Text style={styles.description}>{userProfile.user.description}</Text>
            {isMyProfile && (
              <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{postCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{friendCount}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
        </View>
        {isMyProfile && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={userProfile.posts}
        keyExtractor={(item) => item._id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.postImageGrid} />
        )}
        contentContainerStyle={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  changePhotoButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  changePhotoButtonText: {
    color: '#fff',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
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
    color: '#fff',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
  logoutButton: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  logoutText: {
    color: '#fff',
  },
  postsContainer: {
    paddingVertical: 10,
  },
  postImageGrid: {
    width: '30%',
    height: screenWidth > 600 ? 250 : 120,
    margin: 5,
    borderRadius: 10,
  },
  loadingText: {
    color: '#fff',
  },
  errorText: {
    color: '#ff5c5c',
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default ProfileScreen;