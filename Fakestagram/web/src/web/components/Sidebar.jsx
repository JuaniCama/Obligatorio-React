import React from 'react';

function Sidebar({ onNavigate }) {
    return (
        <aside className="sidebar">
            <ul>
                <li>
                    <i className="fa-solid fa-house icono">  </i>
                    <a onClick={() => onNavigate('home')}>Home</a>
                </li>
                <li>
                    <i className="fa-solid fa-heart icono"> </i>

                    <a onClick={() => onNavigate('notifications')}>Notifications</a>
                </li>
                <li>
                    <i className="fa-solid fa-user icono"> </i>

                    <a onClick={() => onNavigate('profile')}>Profile</a>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
