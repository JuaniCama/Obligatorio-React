import React, { useState } from 'react';
import { Button, Modal, View, Text, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { API_BASE_URL,POSTS_ENDPOINT,AUTH_ENDPOINT } from './constants';
interface AddPostButtonProps {
  onPostAdded: () => void;
}

const AddPostButton: React.FC<AddPostButtonProps> = ({ onPostAdded }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!imageUri || !caption) {
      Alert.alert('Error', 'Por favor selecciona una imagen y añade un caption.');
      return;
    }

    setLoading(true);

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      if (!userId || !token) {
        Alert.alert('Error', 'No se encontró el usuario o el token. Inicia sesión nuevamente.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);

      formData.append('user', userId);
      formData.append('caption', caption);

      const response = await fetch(`${POSTS_ENDPOINT}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Alert.alert('Publicación subida', 'Tu publicación ha sido subida correctamente.');
        onPostAdded();
        setModalVisible(false);
        setImageUri(null);
        setCaption('');
      } else {
        const errorText = await response.text();
        console.error('Error al subir el post:', errorText);
        Alert.alert('Error', 'Ocurrió un error al subir la publicación.');
      }
    } catch (error) {
      console.error('Error al subir el post:', error);
      Alert.alert('Error', 'Ocurrió un error al subir la publicación.');
    }

    setLoading(false);
  };

  return (
    <>
      <Button title="+" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Publicación</Text>

            {imageUri ? (
              <Text>Imagen seleccionada</Text>
            ) : (
              <View style={styles.imagePickerButtons}>
                <Button title="Elegir de la galería" onPress={pickImage} />
                <Button title="Tomar foto" onPress={takePhoto} />
              </View>
            )}

            <TextInput
              placeholder="Caption"
              value={caption}
              onChangeText={setCaption}
              style={styles.input}
            />

            <Button title={loading ? 'Subiendo...' : 'Subir publicación'} onPress={handleUpload} disabled={loading} />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddPostButton;
