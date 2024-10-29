import React, { useState, useEffect } from 'react';
import Navbar from '@web/components/Navbar.jsx';
import Sidebar from '@web/components/Sidebar.jsx';
import Home from '@web/components/Home.jsx';
import Notifications from '@web/components/Notifications.jsx';
import Profile from '@web/components/Profile.jsx';
import Login from '@web/components/Login.jsx';
import Signup from '@web/components/Signup.jsx';



import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // redirige al login si no hay token

  useEffect(() => {
    if (!token) {
      setCurrentScreen('login');
    }
  }, [token]);

  // logica de renderizado
  const renderScreen = () => {
    if (!token) {
      // Si no hay token, muestra Login o Signup
      if (currentScreen === 'signup') {
        return <Signup onNavigate={setCurrentScreen} />;
      }
      return (
        <Login
          onLogin={(token) => {
            setToken(token); // Guarda el token
            localStorage.setItem('token', token); // Almacena en localStorage
            setCurrentScreen('home'); // Redirige a home después del login
          }}
          onNavigate={setCurrentScreen}
        />
      );
    }


    switch (currentScreen) {
      case 'home':
        return <Home />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'login':
        return <Login
          onLogin={(token) => setToken(token)}
          onNavigate={setCurrentScreen}
        />;
      case 'signup':
        return <Signup />;
      default:
        return <Home />;
    }
  };

  // logica del logoff
  const handleLogOff = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setCurrentScreen('login');
  };


  return (
    <div className="app-container">
      {token && ( // Renderiza la Navbar solo si hay token
        <Navbar
          isLoggedIn={!!token}
          onLogOff={handleLogOff}
          onNavigate={setCurrentScreen}
        />
      )}
      {token && <Sidebar onNavigate={setCurrentScreen} />} {/* Renderiza Sidebar solo si hay token */}
      <div className="content">{renderScreen()}</div>
    </div>
  );
}

export default App;
