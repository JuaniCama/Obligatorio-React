import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import styles from '../styles/styles';
import { POSTS_ENDPOINT, API_BASE_URL } from './constants'; 

interface FeedProps {
  refreshFeed: boolean;
  setRefreshFeed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Post {
  _id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  createdAt: string;
  user: {
    username: string;
    profilePicture?: string;
  };
}

const Feed: React.FC<FeedProps> = ({ refreshFeed, setRefreshFeed }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró un token de autenticación. Inicia sesión nuevamente.');
        return;
      }

      const response = await axios.get(`${POSTS_ENDPOINT}/feed?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newPosts: Post[] = response.data;

      if (newPosts.length === 0) {
        setAllLoaded(true); 
      } else {
        const uniquePosts = newPosts.filter(
          (post) => !posts.some((existingPost) => existingPost._id === post._id)
        );

        const sortedPosts = uniquePosts.sort(
          (a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts((prevPosts) => [...sortedPosts, ...prevPosts]);
      }

      setLoading(false);
      setRefreshFeed(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching posts:', error.message);
        Alert.alert('Error', error.message);
      } else {
        console.error('Unexpected error:', error);
        Alert.alert('Error', 'Ocurrió un error inesperado al cargar las publicaciones.');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshFeed, page]);

  const loadMorePosts = () => {
    if (!allLoaded && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getPostImageUrl = (imageUrl: string) => {
    return `${API_BASE_URL}/${imageUrl.replace('\\', '/')}`;
  };

  return (
    <View style={styles.feedContainer}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={styles.feedContent}>
          <FlatList
            data={posts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <View style={styles.userInfo}>
                  <Image
                    source={item.user.profilePicture ? { uri: item.user.profilePicture } : require('../assets/defaultProfile.png')}
                    style={styles.profileImage}
                  />
                  <Text style={styles.username}>{item.user.username}</Text>
                </View>
                <Image source={{ uri: getPostImageUrl(item.imageUrl) }} style={styles.postImage} />
                <Text style={styles.caption}>{item.caption || 'Sin descripción'}</Text>
                <Text style={styles.likes}>{item.likes} Likes</Text>
                <Text style={styles.comments}>Ver los {item.comments} comentarios</Text>
              </View>
            )}
            onEndReached={loadMorePosts}
            onEndReachedThreshold={0.5}
            ListFooterComponent={!allLoaded && loading ? <ActivityIndicator size="small" color="#007bff" /> : null}
          />
        </View>
      )}
    </View>
  );
};

export default Feed;
