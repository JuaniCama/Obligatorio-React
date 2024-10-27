import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true); // Toggle entre registro y login

  // Validación de email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para registrar al usuario
  const register = async () => {
    if (!isValidEmail(email)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,
        password,
      });
      alert('Usuario registrado con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al registrar el usuario');
    }
  };

  // Función para iniciar sesión
  const login = async () => {
    if (!isValidEmail(email)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });
      setToken(response.data.token); // Guardar el token en el estado
      localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
      localStorage.setItem('userId', response.data._id); // Guardar el userId en localStorage
      alert('Login exitoso');
    } catch (err) {
      console.error(err);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>{isRegistering ? 'Registro' : 'Login'}</h2>
      {isRegistering && (
        <>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
        </>
      )}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div>
        {isRegistering ? (
          <button onClick={register} style={{ width: '100%', padding: '10px' }}>
            Registrarse
          </button>
        ) : (
          <button onClick={login} style={{ width: '100%', padding: '10px' }}>
            Iniciar sesión
          </button>
        )}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {isRegistering ? (
          <p>
            ¿Ya tienes una cuenta?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setIsRegistering(false)}
            >
              Inicia sesión aquí
            </span>
          </p>
        ) : (
          <p>
            ¿No tienes cuenta?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setIsRegistering(true)}
            >
              Regístrate aquí
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
