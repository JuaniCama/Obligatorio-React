import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Gallery: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access gallery is required!');
      return false;
    }
    return true;
  };

  const handleOpenGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title="Pick from Gallery" onPress={handleOpenGallery} />
      {photoUri && <Image source={{ uri: photoUri }} style={{ width: 300, height: 300 }} />}
    </View>
  );
};

export default Gallery;
