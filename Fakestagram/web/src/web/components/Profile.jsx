import React from 'react';
import Post from './Post'; // Asumiendo que tienes un componente Post para cada post individual
import './Profile.css'; // Archivo CSS que contiene los estilos
import billAvatar from '../../assets/bill.jpg';

function Profile() {
  // Datos simulados para los posts del usuario
  const userPosts = [
    { id: 1, image: 'url1.jpg', caption: 'First post' },
    { id: 2, image: 'url2.jpg', caption: 'Second post' },
    { id: 3, image: 'url3.jpg', caption: 'Third post' },
    { id: 4, image: 'url3.jpg', caption: 'Third post' },
    { id: 5, image: 'url3.jpg', caption: 'Third post' },
    { id: 6, image: 'url3.jpg', caption: 'Third post' },
    // Agrega más posts
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={billAvatar}
          alt="User Avatar"
          className="profile-avatar"
        />

        <div className="profile-info">
          <div className="profile-username">
            <h2>Usuario</h2>
            <button className="edit-profile-btn">Edit profile</button>
          </div>
          <div className="profile-stats">
            <span>11 posts</span>
            <span>170 friends</span>
          </div>
          <div className="profile-bio">
            <strong>Perfil</strong>
            <p>Una descripción decorosa 🌍</p>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        {userPosts.map(post => (
          <Post 
            imageUrl="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR-rsc7p9uXmx-i2PbvpYl34uQQFrlJ6VcwHnzq7-yLEuaQpGLE75otAhKvvXyBWZXeUWoyVjhQUu965l0t6DMZ6dDnPDRX1EofAcJFYg" 
            profileView={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
