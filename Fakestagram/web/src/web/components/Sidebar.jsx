import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <i className="fa-solid fa-house icono" onClick={() => navigate('/')}></i>
          <a onClick={() => navigate('/')}>Home</a>
        </li>
        <li>
          <i className="fa-solid fa-heart icono" onClick={() => navigate('/notifications')}></i>
          <a onClick={() => navigate('/notifications')}>Notifications</a>
        </li>
        <li>
          <i className="fa-solid fa-user icono" onClick={() => navigate('/profile')}></i>
          <a onClick={() => navigate('/profile')}>Profile</a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;