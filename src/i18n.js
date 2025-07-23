import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React",
      "Hello World": "Hello World",
      "Home page": "Hello I am Homepage",
    },
  },
  hi: {
    translation: {
      "Welcome to React": "नमस्ते React में",
      "Hello World": "नमस्ते दुनिया",
      "Home page": "नमस्ते मैं Homepage हुँ",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
