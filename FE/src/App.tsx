// src/App.js
import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import AppRouter from "pages/AppRouter";
import { NotificationProvider } from "./components/NotificationContext"

function App() {
  const { t } = useTranslation();


  return (
    
    <div
      className="App bg-center bg-no-repeat w-full h-full bg-cover"
      style={{ backgroundImage: 'url("/images/background.svg")' }}
    >
      <NotificationProvider>
      {/* <h2>{t('welcome')}</h2>
      <p>{t('description')}</p> */}
      <AppRouter />
      </NotificationProvider>
    </div>
  );
}

export default App;
