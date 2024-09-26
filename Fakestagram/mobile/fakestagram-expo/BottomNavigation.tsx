import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Feed from './components/Feed';
import Profile from './components/Profile';
import { RootTabParamList } from './type';

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Profile" component={Profile} initialParams={{ isUserProfile: true }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
