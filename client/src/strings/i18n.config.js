import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const init = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: require('../strings/en.json'),
      },
      he: {
        translation: require('../strings/he.json'),
      },
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });
};
