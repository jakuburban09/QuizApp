// src/App.js
import React from "react";
import i18n from "i18next";
import AppRouter from "pages/AppRouter";
import { NotificationProvider } from "./components/NotificationContext";
import configureAxios from "./axiosConfig"; // Importujte konfigurační funkci


function App() {
  return (
    <div
      className="App bg-center bg-no-repeat w-full h-full bg-cover"
      style={{ backgroundImage: 'url("/images/background.svg")' }}
    >
      <NotificationProvider>
        <AppRouter  />
      </NotificationProvider>
    </div>
  );
}

export default App;
