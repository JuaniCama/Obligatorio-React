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
          <Post key={post.id} image={post.image} caption={post.caption} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
