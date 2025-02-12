import React from "react";
import "./Login.css";

const LoginPage: React.FC = () => {
    return (
        <>
        <div className="login-container">
            <div className="login-header">
              <h2>Welcome Back!</h2>
              <p>Please sign in to continue</p>
            </div>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                placeholder="Enter your username"
                autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
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
    </>
    );
};

export default LoginPage;