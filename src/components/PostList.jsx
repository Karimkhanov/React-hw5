import React, { useState } from 'react';
import PostCard from './PostCard';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // 1. Добавляем новое состояние для поискового запроса
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Создаем отфильтрованный массив ПЕРЕД рендерингом.
  // Этот массив будет использоваться для отображения.
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="post-list-container">
      <h1>My Posts</h1>
      <button onClick={fetchPosts} disabled={isLoading || posts.length > 0}>
        {isLoading ? 'Loading...' : 'Load Posts'}
      </button>

      {/* 3. Добавляем поле ввода и кнопку очистки */}
      {/* Мы показываем их только если посты уже загружены */}
      {posts.length > 0 && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            className="search-input"
            value={searchTerm} // Привязываем значение инпута к состоянию
            onChange={e => setSearchTerm(e.target.value)} // Обновляем состояние при вводе
          />
          <button className="clear-button" onClick={() => setSearchTerm('')}>
            Clear
          </button>
        </div>
      )}

      {/* 4. Используем отфильтрованный массив `filteredPosts` для отображения */}
      {/* Вместо `posts.map` теперь `filteredPosts.map` */}
      <ul className="post-list">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))}
      </ul>
      
      {/* Дополнительно: сообщение, если ничего не найдено */}
      {posts.length > 0 && filteredPosts.length === 0 && (
        <p>No posts found matching your search.</p>
      )}
    </div>
  );
};

export default PostList;