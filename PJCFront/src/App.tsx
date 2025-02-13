import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/Login/Login";
import MainPage from "./Components/MainPage/MainPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "./contexts/AuthContext";

const App: React.FC = () => {
  const { token } = useContext(AuthContext); // Берем токен из контекста

  return (
    <Router>
      <Routes>
        {/* Если токен есть, редирект на dashboard, иначе login */}
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
