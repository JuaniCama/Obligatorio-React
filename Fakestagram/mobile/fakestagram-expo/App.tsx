import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Pedir permisos para la cámara
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permissions to make this work!');
      return false;
    }
    return true;
  };

  // Pedir permisos para la galería
  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access gallery is required!');
      return false;
    }
    return true;
  };

  // Abrir la cámara
  const handleOpenCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);  // Accede a la URI dentro de assets
    }
  };

  // Abrir la galería
  const handleOpenGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);  // Accede a la URI dentro de assets
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Take a Photo" onPress={handleOpenCamera} />
      <Button title="Pick from Gallery" onPress={handleOpenGallery} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default App;
