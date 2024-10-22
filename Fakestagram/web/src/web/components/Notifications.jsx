import React from 'react';
import './Notification.css';

function Notifications({ profileImageUrl, username, notificationMessage, timeAgo }) {
  return (
    <div className="notification-box">
      <figure className="notification-image">
        <img src={profileImageUrl} alt={`${username}'s profile`} className="profile-image" />
      </figure>
      <div className="notification-content">
        <p>
          <strong>{username}</strong> {notificationMessage}
        </p>
        <small className="time-ago">{timeAgo}</small>
      </div>
    </div>
  );
}

export default Notifications;