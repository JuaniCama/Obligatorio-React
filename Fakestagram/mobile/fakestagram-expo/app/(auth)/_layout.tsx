import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack>
        <Stack.Screen name="login" options={{headerShown: false}}  />
        <Stack.Screen name="register" options={{headerShown: false}} />
    </Stack>     
  );
}