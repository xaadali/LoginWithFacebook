// LanguageSelector.js
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <label>Select Language:</label>
      <div>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("es")}>Spanish</button>
        {/* Add more language buttons as needed */}
      </div>
    </div>
  );
};

export default LanguageSelector;
