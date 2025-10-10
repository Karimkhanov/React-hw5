import React, { useState } from 'react';
import PostCard from './PostCard'; // Import the card component
import './PostList.css'; // Import the list's CSS

const PostList = () => {
  // State to hold the list of posts
  const [posts, setPosts] = useState([]);
  // State to handle loading message
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch data from the API
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-list-container">
      <h1>My Posts</h1>
      <button onClick={fetchPosts} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load Posts'}
      </button>
      <ul className="post-list">
        {posts.map((post) => (
          // Pass each post's data to the PostCard component via props
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))}
      </ul>
    </div>
  );
};

export default PostList;