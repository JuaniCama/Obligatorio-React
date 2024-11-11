import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import Post from '../components/Post';
import { POSTS_ENDPOINT, API_BASE_URL } from '../constants/constants';
import CustomEventEmitter from '../utils/CustomEventEmitter';

const screenWidth = Dimensions.get('window').width;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    router.push('/(auth)/login');
  };

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

      const postsWithFormattedUrls = response.data.map((post: any) => ({
        ...post,
        imageUrl: `${API_BASE_URL}/${post.imageUrl.replace(/\\/g, '/')}`,
        user: {
          ...post.user,
          profilePicture: post.user.profilePicture || null,
        },
      }));

      setPosts(postsWithFormattedUrls);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar posts:', error);
      if (error.response && error.response.status === 403) {
        handleLogout();
      } else {
        Alert.alert('Error', 'No se pudieron cargar las publicaciones.');
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  useEffect(() => {
    const handlePostAdded = () => {
      fetchPosts();
    };
    CustomEventEmitter.on('refresh', handlePostAdded);

    return () => {
      CustomEventEmitter.off('refresh', handlePostAdded);
    };
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Post
      postId={item._id}
      username={item.user.username}
      userId={item.user._id}
      profileImageUrl={
        item.user.profilePicture ? { uri: item.user.profilePicture } : require('../assets/defaultProfile.png')
      }
      postTime={item.createdAt}
      imageUrl={item.imageUrl}
      description={item.caption}
      commentsIDs={item.comments}
      initialLikes={item.likes}
      profileView={false}
    />
  );

  return (
    <View style={styles.feedContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
  },
  errorText: {
    color: '#ff5c5c',
  },
});

export default Feed;