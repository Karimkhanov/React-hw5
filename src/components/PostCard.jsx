import React from 'react';
import './PostCard.css'; // Import the card's CSS

// Receive title and body as props
const PostCard = ({ title, body }) => {
  return (
    <li className="post-card">
      <h3 className="post-card-title">{title}</h3>
      <p className="post-card-body">{body}</p>
    </li>
  );
};

export default PostCard;