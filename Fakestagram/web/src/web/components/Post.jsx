import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@web/components/css/Post.css';
import { API_BASE_URL, POSTS_ENDPOINT, COMMENTS_ENDPOINT } from '../components/Constants';

function Post({ postId, userId, username, profileImageUrl, postTime, imageUrl, description, likes = [], commentsIDs = [], profileView = false, onNavigate }) {
  const [hasLikes, setHasLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (likes.includes(userId)) {
      setHasLikes(true);
    }
  }, [likes]);

  useEffect(() => {
    const fetchCommentsData = async () => {
      const result = await fetchComments(commentsIDs);
      setComments(result);
    };
    fetchCommentsData();
  }, [commentsIDs]);

  const handleLike = async () => {
    try {
      const token = localStorage.token;
      if (!token) {
        alert('No se encontró el token. Inicia sesión nuevamente.');
        return;
      }
      const response = await axios.post(`${POSTS_ENDPOINT}/${postId}/like`, {}, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setHasLikes(true);
      setLikesCount(response.data.likes.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const token = localStorage.token;
      if (!token) {
        alert('No se encontró el token. Inicia sesión nuevamente.');
        return;
      }
      const response = await axios.delete(`${POSTS_ENDPOINT}/${postId}/like`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setHasLikes(false);
      setLikesCount(response.data.likes.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsernameClick = () => {
    localStorage.setItem('profileUserId', userId);
    window.location.href = `/userProfile/${userId}`;
  };

  const handleNewComment = async () => {
    try {
      const token = localStorage.token;
      if (!token) {
        alert('No se encontró el token. Inicia sesión nuevamente.');
        return;
      }
      const response = await axios.post(`${POSTS_ENDPOINT}/${postId}/comments`, {
        content: comment,
      }, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setComment('');
      setComments([...comments, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (commentsIDs) => {
    try {
      const token = localStorage.token;
      if (!token) {
        alert('No se encontró el token. Inicia sesión nuevamente.');
        return;
      }
      // Promise.all permite hacer todas las llamadas en paralelo
      const responses = await Promise.all(
        commentsIDs.map((commentID) => axios.get(`${COMMENTS_ENDPOINT}/${commentID}`, {
          headers: { "Authorization": `Bearer ${token}` }
        }))
      );
      return responses.map((response) => response.data);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <div className={`box ${profileView ? 'profile-view' : 'feed-view'}`}>
      {!profileView && (
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64 profile-image-container">
              <img src={profileImageUrl} alt={`${username}'s profile`} className="profile-image" />
            </p>
          </figure>
          <div className="media-content">
            <div className="content-vertical">
              <strong onClick={handleUsernameClick} style={{ cursor: 'pointer' }}>{username}</strong> <small>• {postTime}</small>
              <p>{description}</p>
            </div>
          </div>
        </article>
      )}
      <div className={`image ${profileView ? 'is-square' : 'is-4by3'}`}>
        <img src={`${API_BASE_URL}/${imageUrl}`} alt="Post" className="post-image" />
      </div>
      {!profileView && (
        <div>
          <div className="content-vertical">
            <button onClick={hasLikes ? handleUnlike : handleLike}>
              {hasLikes ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
            </button>
            <small>{likesCount} Likes</small>
          </div>
          <div className="content-vertical m-3">
            <p className="subtitle is-6 m-0">Comentarios:</p>
            <div>
              {comments.map((commentContent) => (
                <div className="field is-grouped m-1" key={commentContent._id}>
                  <p><b>{commentContent.user.username}</b> {commentContent.content}</p>
                </div>
              ))}
            </div>
            <div className='field is-grouped'>
              <input
                type='text'
                className='input'
                placeholder='Agrega un comentario...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNewComment();
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;