import React from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList } from 'react-native';

interface Post {
  id: string;
  username: string;
  description: string;
  imageUri: string;
  likes: number;
}

const posts: Post[] = [
  {
    id: '1',
    username: 'FriendName',
    description: "This is my friend's post description...",
    imageUri: 'https://example.com/photo1.jpg',
    likes: 33,
  },
  // Más publicaciones...
];

const Feed: React.FC = () => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Image source={{ uri: item.imageUri }} style={styles.postImage} />
          <Text>{item.likes} Likes</Text>
          <Text>{item.username}</Text>
          <Text>{item.description}</Text>
          <Button title="Like" onPress={() => console.log('Liked post')} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
});

export default Feed;
