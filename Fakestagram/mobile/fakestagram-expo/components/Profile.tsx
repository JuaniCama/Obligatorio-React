import React from 'react';
import { View, Text, Image, Button, FlatList } from 'react-native';
import { ProfileScreenProps } from '../type';  // Importamos los tipos
import { globalStyles } from '../styles/styles';  // Importamos los estilos

interface Post {
  id: string;
  imageUri: string;
}

const Profile: React.FC<ProfileScreenProps> = ({ route }) => {
  const { isUserProfile } = route.params;

  const posts: Post[] = [
    { id: '1', imageUri: 'https://example.com/photo1.jpg' },
    { id: '2', imageUri: 'https://example.com/photo2.jpg' },
  ];

  return (
    <View style={globalStyles.container}>
      <Image source={{ uri: 'https://example.com/profile.jpg' }} style={globalStyles.profileImage} />
      <Text>Username</Text>
      <Text>Bio goes here...</Text>
      {isUserProfile ? (
        <Button title="Edit Profile" onPress={() => console.log('Editing profile')} />
      ) : (
        <Button title="Add Friend" onPress={() => console.log('Adding friend')} />
      )}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => <Image source={{ uri: item.imageUri }} style={globalStyles.postImage} />}
      />
    </View>
  );
};

export default Profile;
