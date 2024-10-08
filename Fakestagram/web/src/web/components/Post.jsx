import React from 'react';
import './Post.css';


function Post({ username, profileImageUrl, postTime, imageUrl, description, profileView = false }) {
  return (
    // <div className={`box ${profileView ? 'profile-view' : 'feed-view'}`}>
    <div className={`box ${profileView ? 'profile-view' : 'feed-view'}`}>

      {/* Imagen del post */}
      <div className={`image ${profileView ? 'is-square' : 'is-4by3'}`}>
          <img src={imageUrl} alt="Post" />
      </div>

      {/* Solo muestra el header si no está en la vista de perfil */ }
      {
        !profileView && (
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={profileImageUrl} alt={`${username}'s profile`} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{username}</strong> <small>• {postTime}</small>
                  <br />
                  {description}
                </p>
              </div>
            </div>
          </article>
        )}
    </div>
  );
}

export default Post;
