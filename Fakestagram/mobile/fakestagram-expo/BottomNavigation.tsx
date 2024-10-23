import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Auth from './components/Auth';
import AddPostButton from './components/AddPostButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppTabs = () => {
  const [refreshFeed, setRefreshFeed] = useState(false);

  const handlePostAdded = () => {
    setRefreshFeed(true);
  };

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Feed" 
        options={{
          headerRight: () => <AddPostButton onPostAdded={handlePostAdded} />,  // Botón de agregar publicación en Feed
        }}>
        {(props) => <Feed {...props} refreshFeed={refreshFeed} setRefreshFeed={setRefreshFeed} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerRight: () => <AddPostButton onPostAdded={handlePostAdded} />,  // Botón de agregar publicación en Profile
        }} 
      />
    </Tab.Navigator>
  );
};

const BottomNavigation = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    checkToken();
  }, []);

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default BottomNavigation;
