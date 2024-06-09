// src/App.js
import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import AppRouter from "pages/AppRouter";

function App() {
  const { t } = useTranslation();


  return (
    <div
      className="App bg-center bg-no-repeat w-full h-full bg-cover"
      style={{ backgroundImage: 'url("/images/background.svg")' }}
    >
      {/* <h2>{t('welcome')}</h2>
      <p>{t('description')}</p> */}
      <AppRouter />
    </div>
  );
}

export default App;
