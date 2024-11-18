import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró el token. Inicia sesión nuevamente.');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(response.data);
    } catch (error) {
      console.error('Error al cargar las notificaciones:', error);
      Alert.alert('Error', 'No se pudieron cargar las notificaciones.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification._id !== notificationId));
  };

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>No hay nuevas notificaciones</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Notifications
              causerProfileImageUrl={item.causer.profilePicture}
              causerUsername={item.causer.username}
              notificationMessage={item.message}
              timeAgo={new Date(item.createdAt).toLocaleString()}
              causerId={item.causer._id}
              notificationId={item._id}
              onDelete={handleDeleteNotification}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsText: {
    color: '#fff',
    fontSize: 18,
  },
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

export default NotificationsScreen;