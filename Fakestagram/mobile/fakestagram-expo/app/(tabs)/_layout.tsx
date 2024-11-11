import { Tabs } from 'expo-router';
import TabBarIcon from '../../components/navigation/TabBarIcon';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AddPostButton from '../../components/AddPostButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleProfileTabPress = async () => {
    await AsyncStorage.removeItem('perfilAVisitar');
    // console.log('Perfil a visitar eliminado');
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#333',
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          headerStyle: {
            backgroundColor: '#333',
          },
          headerTintColor: '#fff',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            title: 'Profile',
          }}
          listeners={{
            tabPress: handleProfileTabPress,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
            title: 'Notifications',
          }}
        />
      </Tabs>

      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addPostButtonText}>+</Text>
      </TouchableOpacity>

      <AddPostButton
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addPostButton: {
    position: 'absolute',
    bottom: '90%',
    left: '80%',
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 10,
  },
  addPostButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});