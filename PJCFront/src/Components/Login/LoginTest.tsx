// src/components/Login.tsx
import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://yourapi.com/login', { username, password });
      const { token } = response.data;
      // Сохраняем токен (например, в localStorage)
      localStorage.setItem('jwt', token);
      // Перенаправляем пользователя на защищённую страницу
      history.push('/dashboard');
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      // Здесь можно вывести уведомление об ошибке
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Welcome Back!</h2>
        <p>Please sign in to continue</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            autoComplete="username"
            value={username} // Связываем с состоянием
            onChange={(e) => setUsername(e.target.value)} // Обновляем значение состояния при изменении
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password} // Связываем с состоянием
            onChange={(e) => setPassword(e.target.value)} // Обновляем значение состояния при изменении
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <a href="about.html" className="about-link">
        About Project Corsun
      </a>
    </div>
  );
};

export default Login;