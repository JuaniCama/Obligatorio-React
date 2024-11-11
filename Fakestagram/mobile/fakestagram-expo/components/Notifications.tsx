import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationsProps {
  causerProfileImageUrl: string;
  causerUsername: string;
  notificationMessage: string;
  timeAgo: string;
  causerId: string;
  onNavigate: (path: string) => void;
  notificationId: string;
  onDelete: (notificationId: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  causerProfileImageUrl,
  causerUsername,
  notificationMessage,
  timeAgo,
  causerId,
  onNavigate,
  notificationId,
  onDelete,
}) => {
  const handleUsernameClick = () => {
    if (onNavigate) {
      onNavigate(`/userProfile/${causerId}`);
    }
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró el token. Inicia sesión nuevamente.');
        return;
      }
      await axios.delete(`${API_BASE_URL}/api/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(notificationId);
    } catch (error) {
      console.error('Error al eliminar la notificación:', error);
      Alert.alert('Error', 'No se pudo eliminar la notificación.');
    }
  };

  return (
    <View style={styles.notificationBox}>
      <TouchableOpacity onPress={handleUsernameClick}>
        <Image source={{ uri: causerProfileImageUrl }} style={styles.profileImage} />
      </TouchableOpacity>
      <View style={styles.notificationContent}>
        <Text style={styles.mensaje}>
          <Text onPress={handleUsernameClick} style={styles.username}>
            {causerUsername}
          </Text>{' '}
          {notificationMessage.replace(causerUsername, '')}
        </Text>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Text style={styles.deleteNotificationIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  timeAgo: {
    color: 'gray',
    fontSize: 12,
  },
  mensaje: {
    color: 'white',
  },
  deleteNotificationIcon: {
    color: '#888',
    fontSize: 16,
  },
});

export default Notifications;