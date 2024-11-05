import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, Alert, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';
import CustomEventEmitter from '../utils/CustomEventEmitter';

interface AddPostButtonProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPostButton: React.FC<AddPostButtonProps> = ({ modalVisible, setModalVisible }) => {
  const [caption, setCaption] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere permiso para acceder a la cámara.');
      }
    })();
  }, []);

  const pickImageFromGallery = async () => {
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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere permiso para acceder a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token || !imageUri) {
      Alert.alert('Error', 'Asegúrate de iniciar sesión y seleccionar una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('caption', caption);

    try {
      await axios.post(`${API_BASE_URL}/api/posts/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      CustomEventEmitter.emit('refresh');
      setModalVisible(false);
      setImageUri(null);
      setCaption('');
      Alert.alert('Publicación subida', 'Tu publicación se ha subido exitosamente.');
    } catch (error) {
      console.error('Error al subir la publicación:', error);
      Alert.alert('Error', 'No se pudo subir la publicación.');
    }
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.title}>Nueva Publicación</Text>
            <View style={modalStyles.imagePreviewContainer}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={modalStyles.imagePreview} />
              ) : (
                <Text style={modalStyles.imagePlaceholder}>Imagen de previsualización</Text>
              )}
            </View>
            <TextInput
              placeholder="Descripción"
              value={caption}
              onChangeText={setCaption}
              style={modalStyles.input}
            />
            <View style={modalStyles.buttonRow}>
              <TouchableOpacity onPress={pickImageFromGallery} style={modalStyles.galleryButton}>
                <Text style={modalStyles.buttonText}>Galería</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} style={modalStyles.cameraButton}>
                <Text style={modalStyles.buttonText}>Cámara</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleUpload} style={modalStyles.uploadButton}>
              <Text style={modalStyles.uploadButtonText}>Subir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={modalStyles.cancelButton}>
              <Text style={modalStyles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: '#888',
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  galleryButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    marginRight: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cameraButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    marginLeft: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadButton: {
    width: '100%',
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddPostButton;