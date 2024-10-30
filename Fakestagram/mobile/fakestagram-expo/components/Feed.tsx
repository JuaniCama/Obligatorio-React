import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';
import { API_BASE_URL, POSTS_ENDPOINT } from '../constants/constants';
import CustomEventEmitter from '../utils/CustomEventEmitter';
interface Post {
  _id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  user: {
    username: string;
    profilePicture?: string;
  };
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró un token de autenticación. Inicia sesión nuevamente.', [
          {
            text: 'OK',
            onPress: () => router.push('/(auth)/login'),
          },
        ]);
        return;
      }

      const response = await axios.get(`${POSTS_ENDPOINT}/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const postsWithFormattedUrls = response.data.map((post: Post) => ({
        ...post,
        imageUrl: post.imageUrl.replace(/\\/g, '/'),
      }));

      setPosts(postsWithFormattedUrls);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar posts:', error);
      Alert.alert('Error', 'No se pudieron cargar las publicaciones.');
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  useEffect(() => {
    fetchPosts();

    const onRefreshFeed = () => {
      fetchPosts();
    };

    CustomEventEmitter.on('refreshFeed', onRefreshFeed);

    return () => {
      CustomEventEmitter.off('refreshFeed', onRefreshFeed);
    };
  }, []);

  return (
    <View style={styles.feedContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <View style={styles.userInfo}>
                <Image
                  source={
                    item.user.profilePicture
                      ? { uri: item.user.profilePicture }
                      : require('../assets/defaultProfile.png')
                  }
                  style={styles.profileImage}
                />
                <Text style={styles.username}>{item.user.username}</Text>
              </View>
              <Image source={{ uri: `${API_BASE_URL}/${item.imageUrl}` }} style={styles.postImage} />
              <Text style={styles.caption}>{item.caption || 'Sin descripción'}</Text>
              <Text style={styles.likes}>{item.likes} Likes</Text>
              <Text style={styles.comments}>Ver los {item.comments} comentarios</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Feed;
