import React from 'react';
import { enableScreens } from 'react-native-screens';
import BottomNavigation from './BottomNavigation';

enableScreens();

const App: React.FC = () => {
  return <BottomNavigation />;
};

export default App;
