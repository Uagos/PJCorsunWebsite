import React from "react";
import "./App.css"; // Подключаем CSS (путь зависит от расположения файла)
import TopBanner from "./Components/Top-banner/Top-banner";
import LoginPage from "./Components/Login/Login";

const App: React.FC = () => {
  return (
    <>
    <TopBanner/> 
    <LoginPage/>
    </>
  );
};

export default App;
