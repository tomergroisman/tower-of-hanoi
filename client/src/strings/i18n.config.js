import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {rehydrate} from '../utils/rehydrate';

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
    lng: rehydrate.language(),
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });
};
