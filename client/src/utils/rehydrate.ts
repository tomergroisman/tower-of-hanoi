import {Language} from '../store/types/app';

export const rehydrate = {
  language: () => (window.localStorage.getItem('language') as Language) ?? 'en',
};
