import React from 'react';
import { useState, useEffect } from 'react';
import Post from './Post'; // Asumiendo que tienes un componente Post para cada post individual
import './Profile.css'; // Archivo CSS que contiene los estilos
import { PROFILE_ENDPOINT } from './Constants';
import axios from 'axios';

// Obtener el perfil del usuario dado su ID
const fetchProfile = async () => {
  try {
    const token = localStorage.token;
    const userId = localStorage.userId;
    if (!token || !userId) {
      alert('No se encontró el token o userId. Inicia sesión nuevamente.');
      return;
    }

    const response = await axios.get(`${PROFILE_ENDPOINT}` + userId, {
      headers: { "Authorization": `Bearer ${token}` }
    }
    );

    return response.data;

  } catch (error) {
    console.log(error);
  }
}

function Profile() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile();
      setProfile(data);
    };
    getProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profile.user?.profilePicture}
          alt="User Avatar"
          className="profile-avatar"
        />

        <div className="profile-info">
          <div className="profile-username">
            <h2>{profile.user?.username}</h2>
            <button className="edit-profile-btn">Edit profile</button>
          </div>
          <div className="profile-stats">
            <span>{profile.posts?.length} posts</span>
            <span>170 friends</span>
          </div>
          <div className="profile-bio">
            <strong>Perfil</strong>
            <p>{profile.user?.email}</p>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        {profile.posts?.map(post => (
          <Post
            imageUrl={post.imageUrl}
            profileView={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
