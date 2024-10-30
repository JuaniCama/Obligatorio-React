import React, { useState, useEffect } from 'react';
import Post from '../components/Post'; // Asumiendo que tienes un componente Post para cada post individual
import './css/Profile.css'; // Archivo CSS que contiene los estilos
import { PROFILE_ENDPOINT } from '../components/Constants';
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
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (profileData) => {
  try {
    const token = localStorage.token;
    if (!token) {
      alert('No se encontró el token. Inicia sesión nuevamente.');
      return;
    }

    const response = await axios.put(`${PROFILE_ENDPOINT}edit`, profileData, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

function Profile() {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile();
      if (data) {
        setProfile(data);
        setUsername(data.user?.username || '');
        setProfilePicture(data.user?.profilePicture || '');
      }
    };
    getProfile();
  }, []);

  const handleEdit = async () => {
    const updatedProfile = await updateProfile({ username, profilePicture });
    setProfile(updatedProfile);
    setIsEditing(false);
  };

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
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <h2>{profile.user?.username}</h2>
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit profile</button>
              </>
            )}
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
            imageUrl={post.imageUrl}
            profileView={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;