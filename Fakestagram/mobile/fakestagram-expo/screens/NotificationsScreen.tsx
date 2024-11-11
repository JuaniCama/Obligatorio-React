import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifications from '../components/Notifications';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
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

    fetchNotifications();
  }, []);

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification._id !== notificationId));
  };


  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default NotificationsScreen;