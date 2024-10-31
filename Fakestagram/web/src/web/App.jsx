import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  const [currentScreen, setCurrentScreen] = useState('login'); // Empieza en login
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Redirige a la pantalla de login si no hay token
  useEffect(() => {
    if (!token) {
      setCurrentScreen('login');
    }
  }, [token]);

  const handleNavigate = (screen, userId = null) => {
    setCurrentScreen(screen);
    if (userId) {
      setCurrentUserId(userId);
    }
  };

  const renderScreen = () => {
    if (!token) {
      // Si no hay token, muestra Login o Signup
      if (currentScreen === 'signup') {
        return <Signup onNavigate={handleNavigate} />;
      }
      return (
        <Login
          onLogin={(token) => {
            setToken(token); // Guarda el token
            localStorage.setItem('token', token); // Almacena en localStorage
            setCurrentScreen('home'); // Redirige a home después del login
          }}
          onNavigate={handleNavigate}
        />
      );
    }
    // Si hay token, muestra las pantallas protegidas
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'userProfile':
        return <UserProfile userId={currentUserId} />;
      default:
        return <Home />;
    }
  };

  const handleLogOff = () => {
    setToken(null);
    localStorage.removeItem('token'); // Elimina el token
    localStorage.removeItem('userId'); // Elimina el userId
    setCurrentScreen('login'); // Redirige a Login después de cerrar sesión
  };

  return (
    <Router>
      <div className="app-container">
        {(token || currentScreen === 'login' || currentScreen === 'signup') && (
          <Navbar
            isLoggedIn={!!token}
            onLogOff={handleLogOff}
            onNavigate={handleNavigate}
          />
        )}
        {token && <Sidebar />} {/* Renderiza Sidebar solo si hay token */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home onNavigate={handleNavigate} />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/userProfile/:userId" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;