import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post'; // Importa el componente Post
import Notifications from './Notifications'; // Importa el componente Notification
import './Home.css'; // Archivo CSS que contiene los estilos
import { FEED_ENDPOINT } from './Constants';

const fetchPosts = async () => {
  try {
    const token = localStorage.token;
    const response = await axios.get(`${FEED_ENDPOINT}`, {
      headers: { "Authorization": `Bearer ${token}` }
    }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => async () => {
    const data = await fetchPosts();
    setPosts(data);
  }, [])

  return (
    <div className="content">
      <div className="feed">
        <h2>Acá habria historias si me pagaran</h2>

        <div>
          {posts.map((post) =>
            <Post
              key={post.id}
              username={post.user.username}
              profileImageUrl={post.user.profileImageUrl}
              postTime={post.createdAt}
              imageUrl={post.imageUrl}
              description={post.caption}
              profileView={false}
            />
          )}
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
