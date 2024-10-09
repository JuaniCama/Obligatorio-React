import React from 'react';
import Post from './Post'; // Importa el componente Post

function Home() {
  return (
    <div>
      <h2>Home!!</h2>
      <p>Welcome to the Fakestagram Home page! 😎</p>

      {/* Ejemplo de un Post en el feed */}
      <div>
        <Post 
          username="usuario123"
          profileImageUrl="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR-rsc7p9uXmx-i2PbvpYl34uQQFrlJ6VcwHnzq7-yLEuaQpGLE75otAhKvvXyBWZXeUWoyVjhQUu965l0t6DMZ6dDnPDRX1EofAcJFYg"
          postTime="5 min"
          imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/cnne-412093-170522202550-02-versova-beach-exlarge-169.jpg?c=original"
          description="Disfrutando el día en la playa! 🌞"
          profileView={false} // Indica que se muestra en el feed
        />
        <Post 
        username="usuario123"
        profileImageUrl="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR-rsc7p9uXmx-i2PbvpYl34uQQFrlJ6VcwHnzq7-yLEuaQpGLE75otAhKvvXyBWZXeUWoyVjhQUu965l0t6DMZ6dDnPDRX1EofAcJFYg"
        postTime="5 min"
        imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/cnne-412093-170522202550-02-versova-beach-exlarge-169.jpg?c=original"
        description="Disfrutando el día en la playa! 🌞"
        profileView={false} // Indica que se muestra en el feed
      />
      </div>
    </div>
  );
}

export default Home;
