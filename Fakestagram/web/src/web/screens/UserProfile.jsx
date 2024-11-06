import React, { useState, useEffect } from 'react';
import Post from '../components/Post'; // Asumiendo que tienes un componente Post para cada post individual
import './css/Profile.css'; // Archivo CSS que contiene los estilos
import { PROFILE_ENDPOINT } from '../components/Constants';
import axios from 'axios';

const fetchUserProfile = async (userId) => {
  try {
    const token = localStorage.token;
    if (!token) {
      alert('No se encontró el token. Inicia sesión nuevamente.');
      return;
    }

    const response = await axios.get(`${PROFILE_ENDPOINT}${userId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

function UserProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
      const data = await fetchUserProfile(userId);
      if (data) {
        setProfile(data);
      }
    };
    getUserProfile();
  }, [userId]);

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
            key={post._id} // Asegúrate de que cada Post tenga una key única
            postId={post._id} // Pasa el postId correctamente
            username={post.user?.username || 'Usuario desconocido'}
            profileImageUrl={post.user?.profilePicture || 'defaultProfileImageUrl'}
            postTime={post.createdAt}
            imageUrl={post.imageUrl}
            description={post.caption}
            profileView={true}
          />
        ))}
      </div>
    </div>
  );
}

export default UserProfile;