import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post'; // Importa el componente Post
import Notifications from '../components/Notifications'; // Importa el componente Notification
import './css/Home.css'; // Archivo CSS que contiene los estilos
import { FEED_ENDPOINT } from '../components/Constants';

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

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(Array.isArray(data) ? data : []);
    };
    getPosts();
  }, []);

  return (
    <div className="content">
      <div className="feed">
        <h2>Fakestagram Feed</h2>
        <div>
          {posts.map((post) => (
            <Post
              key={post._id} // Asegúrate de que cada Post tenga una key única
              postId={post._id} // Pasa el postId correctamente
              username={post.user?.username || 'Usuario desconocido'}
              profileImageUrl={post.user?.profilePicture || 'defaultProfileImageUrl'}
              postTime={post.createdAt}
              imageUrl={post.imageUrl}
              description={post.caption}
              likes={post.likes} // Pasa la información de los likes
              profileView={false}
            />
          ))}
        </div>
      </div>
      <div className="notifications">
        <h2>Notificaciones</h2>
        <Notifications
          profileImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBquwCjgzlqB_iRQXk4XGJNDITTEw6_uJ6Yg&s"
          username="gero.momo"
          notificationMessage="le ha gustado tu historia."
          timeAgo="1 dia"
        />
        <Notifications
          profileImageUrl="https://media.tenor.com/-4Uzz-7fB34AAAAe/senseicloss-lasecta.png"
          username="usuario456"
          notificationMessage="ha comentado en tu foto."
          timeAgo="2 sem"
        />
      </div>
    </div>
  );
}

export default Home;