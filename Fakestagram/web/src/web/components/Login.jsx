import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!isValidEmail(email) || password.length < 4) {
      alert('Email inválido o contraseña muy corta.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data._id);
      onLogin(response.data.token); // Actualiza el estado del token en App
      alert('Login exitoso');
      onNavigate('home'); // Redirige al Home

    } catch (err) {
      console.error(err);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={handleLogin} style={{ width: '100%', padding: '10px' }}>
        Iniciar sesión
      </button>
    </div>
  );
};

export default Login;
