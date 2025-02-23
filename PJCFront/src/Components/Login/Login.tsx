// src/components/Login.tsx
import React, { useState } from 'react';
import './Login.css';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {

  const [username, setUsername] = useState(''); // Состояние для имени пользователя
  const [password, setPassword] = useState(''); // Состояние для пароля
  const [error, setError] = useState(false); // Состояние для ошибки

  const navigate = useNavigate(); 
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    try {
      const response = await api.post('/login', { username, password }); 
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Ошибка при логине:', error);
      setError(true);
    }
  }///

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Welcome Back!</h2>
        <p>Please sign in to continue</p>
      </div>
      {error && <p className="error-message">{"error"}</p>}
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
