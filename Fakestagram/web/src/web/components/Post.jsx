import React from 'react';
import { useState } from 'react';
import '@web/components/css/Post.css';

function Post({ username, profileImageUrl, postTime, imageUrl, description, profileView = false }) {
  const [hasLikes, setHasLikes] = useState(false);

  function handleLike(){
    setHasLikes(!hasLikes);
  }

  return (
    <div className={`box ${profileView ? 'profile-view' : 'feed-view'}`}>
      {/* Solo muestra el header si no está en la vista de perfil */}
      {
        !profileView && (
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64 profile-image-container">
                <img src={profileImageUrl} alt={`${username}'s profile`} className="profile-image" />
              </p>
            </figure>
            <div className="media-content">
              <div className="content-vertical">
                <strong>{username}</strong> <small>• {postTime}</small>
                <p>{description}</p>
              </div>
            </div>
          </article>
        )}

      {/* Imagen del post */}
      <div className={`image ${profileView ? 'is-square' : 'is-4by3'}`}>
        <img src={imageUrl} alt="Post" className="post-image" />
      </div>

      {/* Likes y comentarios*/}
      {!profileView &&
        <div>
          <div className="content-vertical">
            <button onClick={handleLike}>{hasLikes ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}</button>
            <small>32 Likes</small>
          </div>
        </div>
      }
    </div>
  );
}

export default Post;
