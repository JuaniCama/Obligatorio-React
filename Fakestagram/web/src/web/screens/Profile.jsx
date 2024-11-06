import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Post from '../components/Post'; // Asumiendo que tienes un componente Post para cada post individual
import './css/Profile.css'; // Archivo CSS que contiene los estilos
import { PROFILE_ENDPOINT } from '../components/Constants';
import axios from 'axios';

// Obtener el perfil del usuario dado su ID
const fetchProfile = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token || !userId) {
      alert('No se encontró el token o userId. Inicia sesión nuevamente.');
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

const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const getProfile = async () => {
    const userId = localStorage.getItem('userId');
    const data = await fetchProfile(userId);
    if (data) {
      setProfile(data);
      setUsername(data.user?.username || '');
      setEmail(data.user?.email || '');
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSave = async () => {
    const updatedProfile = await updateProfile({ username, email });
    if (updatedProfile) {
      await getProfile(); // Actualiza el perfil y los posts después de guardar los cambios
      setIsEditing(false);
    }
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
            <h2>{profile.user?.username}</h2>
            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Editar Perfil</button>
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
            userId={post.user?._id} // Pasa el userId correctamente
            username={post.user?.username || 'Usuario desconocido'}
            profileImageUrl={post.user?.profilePicture || 'defaultProfileImageUrl'}
            postTime={post.createdAt}
            imageUrl={post.imageUrl}
            description={post.caption}
            likes={post.likes} // Pasa la información de los likes
            commentsIDs={post.comments} // Pasa la información de los comments
            profileView={true} // Indica que es la vista de perfil
          />
        ))}
      </div>
      <Modal
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        contentLabel="Editar Perfil"
        className="edit-profile-modal"
        overlayClassName="edit-profile-overlay"
      >
        <h3>Editar Perfil</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nuevo nombre de usuario"
          className="profile-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nuevo correo electrónico"
          className="profile-input"
        />
        <button className="profile-btn save-btn" onClick={handleSave}>Guardar</button>
        <button className="profile-btn cancel-btn" onClick={() => setIsEditing(false)}>Cancelar</button>
      </Modal>
    </div>
  );
}

export default Profile;