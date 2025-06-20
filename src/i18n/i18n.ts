import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishResource from './resources/en.json'
import portugueseResource from './resources/pt.json'
import spanishResource from './resources/es.json'

const resources = {
  en: { translation: englishResource },
  pt: { translation: portugueseResource },
  es: { translation: spanishResource },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;