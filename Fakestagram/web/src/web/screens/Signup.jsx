import React, { useState } from 'react';
import axios from 'axios';
import { REGISTER_ENDPOINT } from '../components/Constants';

const SignUp = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!isValidEmail(email) || password.length < 4) {
      alert('Email inválido o contraseña muy corta.');
      return;
    }

    try {
      const response = await axios.post(`${REGISTER_ENDPOINT}`, {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data._id);
      alert('Usuario registrado con éxito');
      onNavigate('/login'); // Redirige al Login después del registro
    } catch (err) {
      console.error(err);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
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
      <button onClick={handleRegister} style={{ width: '100%', padding: '10px' }}>
        Registrarse
      </button>
    </div>
  );
};

export default SignUp;