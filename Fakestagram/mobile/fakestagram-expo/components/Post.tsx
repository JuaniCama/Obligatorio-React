import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, Dimensions, TextInput, FlatList } from 'react-native';
import { likePost, unlikePost } from '../services/postService';
import { getUserId } from '../utils/auth';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { COMMENTS_ENDPOINT, POSTS_ENDPOINT } from '../constants/constants';

const screenWidth = Dimensions.get('window').width;

interface PostProps {
  postId: string;
  username: string;
  userId: string;
  profileImageUrl: string | { uri: string };
  postTime: string;
  imageUrl: string;
  description: string;
  initialLikes: string[];
  profileView: boolean;
  commentsIDs?: string[]; // Hacer que commentsIDs sea opcional
}

const Post: React.FC<PostProps> = ({ postId, username, userId, profileImageUrl, postTime, imageUrl, description, initialLikes, profileView, commentsIDs = [] }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes.length);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const router = useRouter();
  const lastTap = useRef<number | null>(null);

  useEffect(() => {
    const checkLikes = async () => {
      const userId = await getUserId();
      if (userId && initialLikes.includes(userId)) {
        setHasLiked(true);
      }
    };
    checkLikes();
  }, [initialLikes]);

  const handleLike = async () => {
    try {
      await likePost(postId);
      setHasLiked(true);
      setLikesCount(likesCount + 1);
    } catch (error) {
      console.error('Error al dar like:', error);
      Alert.alert('Error', `No se pudo dar like a la publicación. Detalles: ${error.message}`);
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikePost(postId);
      setHasLiked(false);
      setLikesCount(likesCount - 1);
    } catch (error) {
      console.error('Error al quitar like:', error);
      Alert.alert('Error', `No se pudo quitar el like a la publicación. Detalles: ${error.message}`);
    }
  };

  const handleProfilePress = async () => {
    await AsyncStorage.setItem('perfilAVisitar', userId);
    router.push(`/(tabs)/profile/`);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < 300) {
      if (!hasLiked) {
        handleLike();
      }
    } else {
      lastTap.current = now;
    }
  };

  const fetchComments = async (commentsIDs) => {
    try {

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró un token de autenticación. Inicia sesión nuevamente.');
        return [];
      }

      const responses = await Promise.all(
        commentsIDs.map((commentID) => axios.get(`${COMMENTS_ENDPOINT}/${commentID}`, {
          headers: { Authorization: `Bearer ${token}` },
        }))
      );;

      const commentsData = responses.map((response) => response.data);
      return commentsData;
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
      Alert.alert('Error', 'No se pudieron cargar los comentarios.');
      return [];
    }
  };

  const handleNewComment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró un token de autenticación. Inicia sesión nuevamente.');
        return;
      }

      const response = await axios.post(`${POSTS_ENDPOINT}/${postId}/comments`, { content: comment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComment('');
      setComments([...comments, response.data]);
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      Alert.alert('Error', 'No se pudo agregar el comentario.');
    }
  };

  useEffect(() => {
    const fetchCommentsData = async () => {
      const result = await fetchComments(commentsIDs);
      setComments(result);
    };
    fetchCommentsData();
  }, [commentsIDs]);

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={typeof profileImageUrl === 'string' ? { uri: profileImageUrl } : profileImageUrl}
            style={styles.profileImage}
            defaultSource={require('../assets/defaultProfile.png')}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.postTime}>{postTime}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={1} onPress={handleDoubleTap}>
        <Image source={{ uri: imageUrl }} style={styles.postImage} />
      </TouchableOpacity>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.actions}>
        <View style={styles.likeContainer}>
          <TouchableOpacity onPress={hasLiked ? handleUnlike : handleLike}>
            <FontAwesome name={hasLiked ? 'heart' : 'heart-o'} size={24} color={hasLiked ? 'red' : 'white'} />
          </TouchableOpacity>
          <Text style={styles.likesCount}>{likesCount}</Text>
        </View>
      </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={styles.commentText}>{item.user.username}: {item.content}</Text>
        )}
        ListEmptyComponent={<Text style={styles.noCommentsText}>No hay comentarios aún.</Text>}
      />
      <TextInput
        placeholder="Agregar un comentario..."
        placeholderTextColor="#888"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleNewComment} style={styles.addCommentButton}>
        <Text style={styles.addCommentButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
  },
  postTime: {
    color: '#888',
  },
  postImage: {
    width: '100%',
    height: screenWidth > 600 ? 600 : 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    color: 'white',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  commentText: {
    color: 'white',
    marginBottom: 5,
  },
  noCommentsText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'white',
  },
  addCommentButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addCommentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Post;