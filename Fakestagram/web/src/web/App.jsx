import React, { useState } from 'react';
import Navbar from '@web/components/Navbar.jsx';
import Sidebar from '@web/components/Sidebar.jsx';
import Home from '@web/components/Home.jsx';
import Notifications from '@web/components/Notifications.jsx';
import Profile from '@web/components/Profile.jsx';
import Auth from '@web/components/Auth.jsx';

import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'auth':
        return <Auth />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <Navbar onNavigate={setCurrentScreen} />
      <Sidebar onNavigate={setCurrentScreen} />
      <div className="content">{renderScreen()}</div>
    </div>
  );
}

export default App;
