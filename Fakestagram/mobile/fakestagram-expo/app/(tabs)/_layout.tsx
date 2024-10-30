// _layout.tsx
import { Tabs } from 'expo-router';
import TabBarIcon from '../../components/navigation/TabBarIcon';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AddPostButton from '../../components/AddPostButton';

export default function Layout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tabs>
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
        />
      </Tabs>

      {/* Botón flotante para abrir el modal */}
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
    top: 10,
    right: 10,
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
