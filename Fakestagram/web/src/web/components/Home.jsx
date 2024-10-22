import React from 'react';
import Post from './Post'; // Importa el componente Post
import Notifications from './Notifications'; // Importa el componente Notification
import './Home.css'; // Archivo CSS que contiene los estilos

function Home() {
  return (
    <div className="content">
      <div className="feed">
        <h2>Acá habria historias si me pagaran</h2>

        {/* Ejemplo de un Post en el feed */}
        <Post 
          username="walter_blanco"
          profileImageUrl="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR-rsc7p9uXmx-i2PbvpYl34uQQFrlJ6VcwHnzq7-yLEuaQpGLE75otAhKvvXyBWZXeUWoyVjhQUu965l0t6DMZ6dDnPDRX1EofAcJFYg"
          postTime="5 min"
          imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/cnne-412093-170522202550-02-versova-beach-exlarge-169.jpg?c=original"
          description="Disfrutando el día en la playa! 🌞"
          profileView={false} // Indica que se muestra en el feed
        />
        <Post 
          username="luissuarez9"
          profileImageUrl="https://pbs.twimg.com/profile_images/1658477624048615427/hnP_Zpy5_400x400.jpg"
          postTime="15 min"
          imageUrl="https://pbs.twimg.com/profile_images/1658477624048615427/hnP_Zpy5_400x400.jpg"
          description="#NuevaFotoDePerfil"
          profileView={false} // Indica que se muestra en el feed
        />
        <Post 
          username="oficialcap"
          profileImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIw9PxZ5P-pLcFS3O0iqDixKQpxvXsZ50gOA&s"
          postTime="2 horas"
          imageUrl="https://pbs.twimg.com/media/Fb_BkghWYAM-uVS.jpg"
          description="asdsdadsa"
          profileView={false} // Indica que se muestra en el feed
        />
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
