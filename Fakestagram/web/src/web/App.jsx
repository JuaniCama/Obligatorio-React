import React, { useState, useEffect } from 'react';
import Navbar from '@web/components/Navbar.jsx';
import Sidebar from '@web/components/Sidebar.jsx';
import Home from '@web/screens/Home.jsx';
import Notifications from '@web/components/Notifications.jsx';
import Profile from '@web/screens/Profile.jsx';
import Login from '@web/screens/Login.jsx';
import Signup from '@web/screens/Signup.jsx';
import UserProfile from '@web/screens/UserProfile.jsx';

import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState(window.location.pathname);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId') || null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentScreen(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (screen, userId = null) => {
    setCurrentScreen(screen);
    window.history.pushState({}, '', screen);
    if (userId) {
      setCurrentUserId(userId);
      localStorage.setItem('userId', userId);
    }
  };

  const renderScreen = () => {
    if (!token) {
      if (currentScreen === '/signup') {
        return <Signup onNavigate={handleNavigate} />;
      }
      if (currentScreen === '/register') {
        return <Signup onNavigate={handleNavigate} />;
      }
      return (
        <Login
          onLogin={(token, userId) => {
            setToken(token);
            localStorage.setItem('token', token);
            setCurrentUserId(userId);
            localStorage.setItem('userId', userId);
            handleNavigate('/home');
          }}
          onNavigate={handleNavigate}
        />
      );
    }

    switch (currentScreen) {
      case '/home':
        return <Home onNavigate={handleNavigate} />;
      case '/notifications':
        return <Notifications />;
      case '/profile':
        return <Profile />;
      case '/userProfile':
        return <UserProfile userId={currentUserId} onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const handleLogOff = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    handleNavigate('/login');
  };

  return (
    <div className="app-container">
      {(token || currentScreen === '/login' || currentScreen === '/signup' || currentScreen === '/register') && (
        <Navbar
          isLoggedIn={!!token}
          onLogOff={handleLogOff}
          onNavigate={handleNavigate}
        />
      )}
      {token && <Sidebar onNavigate={handleNavigate} />}
      <div className="content">{renderScreen()}</div>
    </div>
  );
}

export default App;