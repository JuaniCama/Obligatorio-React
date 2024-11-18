import React, { useState } from 'react';
import axios from 'axios';
import { LOGIN_ENDPOINT } from '../components/Constants';

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
      const response = await axios.post(`${LOGIN_ENDPOINT}`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data._id);
      onLogin(response.data.token, response.data._id); // Actualiza el estado del token y userId en App
      alert('Login exitoso');
      onNavigate('/home'); // Redirige al Home

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
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        ¿No tienes una cuenta? <a href="#" onClick={() => onNavigate('/register')}>Regístrate</a>
      </p>
    </div>
  );
};

export default Login;