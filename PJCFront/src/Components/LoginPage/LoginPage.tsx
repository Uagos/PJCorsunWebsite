// pjcfront/src/components/LoginPage/LoginPage.tsx
import React, { useContext, useEffect } from "react";
import Login from "../Login/Login";
import TopBanner from "../Top-banner/Top-banner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const LoginPage: React.FC = () => {
  
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token in LoginPage:", token);
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);
  
  return (
    <>
      <TopBanner/>
      <Login/>
    </>
  );
};

export default LoginPage;