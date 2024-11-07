import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post'; // Importa el componente Post
import Notifications from '../components/Notifications'; // Importa el componente Notification
import './css/Home.css'; // Archivo CSS que contiene los estilos
import { FEED_ENDPOINT, API_BASE_URL } from '../components/Constants';

const fetchPosts = async () => {
  try {
    const token = localStorage.token;
    if (!token) {
      return [];
    }
    const response = await axios.get(`${FEED_ENDPOINT}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchNotifications = async () => {
  try {
    const token = localStorage.token;
    if (!token) {
      return [];
    }
    const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

function Home({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(Array.isArray(data) ? data : []);
    };
    getPosts();
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    };
    getNotifications();
  }, []);

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification._id !== notificationId));
  };

  return (
    <div className="content">
      <div className="feed">
        <h2>Fakestagram Feed</h2>
        <div>
          {posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              userId={post.user?._id}
              username={post.user?.username || 'Usuario desconocido'}
              profileImageUrl={post.user?.profilePicture || 'defaultProfileImageUrl'}
              postTime={post.createdAt}
              imageUrl={post.imageUrl}
              description={post.caption}
              likes={post.likes}
              commentsIDs={post.comments}
              profileView={false}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
      <div className="notifications">
        <h2>Notificaciones</h2>
        {notifications.map((notification) => (
          notification.causer && (
            <Notifications
              key={notification._id}
              notificationId={notification._id}
              causerProfileImageUrl={notification.causer.profilePicture}
              causerUsername={notification.causer.username}
              notificationMessage={notification.message}
              timeAgo={new Date(notification.createdAt).toLocaleString()}
              causerId={notification.causer._id}
              onNavigate={onNavigate}
              onDelete={handleDeleteNotification}
            />
          )
        ))}
      </div>
    </div>
  );
}

export default Home;