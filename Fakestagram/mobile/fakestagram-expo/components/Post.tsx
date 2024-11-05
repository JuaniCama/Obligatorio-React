import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { likePost, unlikePost } from '../services/postService';
import { getUserId } from '../utils/auth';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

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
}

const Post: React.FC<PostProps> = ({ postId, username, userId, profileImageUrl, postTime, imageUrl, description, initialLikes, profileView }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes.length);
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
});

export default Post;