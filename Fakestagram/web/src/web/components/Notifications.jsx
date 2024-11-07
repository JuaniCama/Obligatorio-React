import React from 'react';
import '@web/components/css/Notification.css';
import axios from 'axios';
import { API_BASE_URL } from '../components/Constants'; // Importa API_BASE_URL

function Notifications({ causerProfileImageUrl, causerUsername, notificationMessage, timeAgo, causerId, onNavigate, notificationId, onDelete }) {
  const handleUsernameClick = () => {
    if (onNavigate) {
      onNavigate(`/userProfile/${causerId}`);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No se encontró el token. Inicia sesión nuevamente.');
        return;
      }
      await axios.delete(`${API_BASE_URL}/api/notifications/${notificationId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      onDelete(notificationId);
    } catch (error) {
      console.error('Error al eliminar la notificación:', error);
    }
  };

  return (
    <div className="notification-box">
      <figure className="notification-image">
        <img src={causerProfileImageUrl} alt={`${causerUsername}'s profile`} className="profile-image" />
      </figure>
      <div className="notification-content">
        <p>
          <strong onClick={handleUsernameClick} style={{ cursor: 'pointer' }}>{causerUsername}</strong> {notificationMessage.replace(causerUsername, '')}
        </p>
        <small className="time-ago">{timeAgo}</small>
      </div>
      <i className="fa fa-trash delete-notification-icon" onClick={handleDelete}></i>
    </div>
  );
}

export default Notifications;