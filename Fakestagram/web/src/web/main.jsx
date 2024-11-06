import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@web/App.jsx';
import '@/assets/index.css';
import Modal from 'react-modal';

// Define el elemento principal de la aplicación para react-modal
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);