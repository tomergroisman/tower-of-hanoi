import {AppActions} from '../reducers/app';
import {Language, User} from '../types/app';

export const setUser = (user: User) => ({
  type: AppActions.SET_USER,
  payload: user,
});

export const setLanguage = (language: Language) => ({
  type: AppActions.SET_LANGUAGE,
  payload: language,
});
