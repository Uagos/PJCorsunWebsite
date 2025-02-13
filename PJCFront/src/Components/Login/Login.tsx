// src/components/Login.tsx
import React, { useState, useContext } from 'react';
import api from '../../api/axios'; // axios instance с interceptor-ом для JWT
import { AuthContext } from '../../contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Предполагается, что сервер принимает username и password
      const response = await api.post('/login', { username, password });
      const token = response.data.token;
      login(token);
    } catch (err) {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Welcome Back!</h2>
        <p>Please sign in to continue</p>
      </div>
      {error && <p className="error-message">{error}</p>}
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
