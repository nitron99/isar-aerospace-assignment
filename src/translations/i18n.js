import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

//import lang. files
import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_DE } from "./de/translations";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'de'],
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      de: {
        translation: TRANSLATIONS_DE
      }
    },
  });

// i18n.changeLanguage("en");