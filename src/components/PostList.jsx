// 1. Импортируем useEffect вместе с useState
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Устанавливаем true по умолчанию
  const [searchTerm, setSearchTerm] = useState('');

  // Функция для загрузки данных
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Убираем флаг загрузки после завершения
    }
  };

  // 2. Добавляем хук useEffect
  useEffect(() => {
    // Вызываем нашу функцию загрузки данных внутри useEffect
    fetchPosts();
  }, []); // 3. Пустой массив зависимостей!

  // Логика фильтрации
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  //  Условный рендеринг для состояния загрузки
  if (isLoading) {
    return <div className="post-list-container"><p>Loading posts...</p></div>;
  }

  return (
    <div className="post-list-container">
      <h1>My Posts</h1>

      {/* Поле поиска и кнопка очистки */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="clear-button" onClick={() => setSearchTerm('')}>
          Clear
        </button>
      </div>

      <ul className="post-list">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))}
      </ul>
      
      {filteredPosts.length === 0 && (
        <p>No posts found matching your search.</p>
      )}
    </div>
  );
};

export default PostList;