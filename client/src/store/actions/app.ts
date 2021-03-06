import {AppActions} from '../reducers/app';
import {Language, User} from '../types/app';
import {Record} from '../../utils/api/interfaces/Record';
import {UserIcon} from '../../components/UserIconSet/interface/UserIcon';

export const setUser = (user: User) => ({
  type: AppActions.SET_USER,
  payload: user,
});

export const setBestRecords = (bestRecords: (Record | undefined)[]) => ({
  type: AppActions.SET_BEST_RECORDS,
  payload: bestRecords,
});

export const setPath = (path: string) => ({
  type: AppActions.SET_PATH,
  payload: path,
});

export const setIcon = (icon?: UserIcon) => ({
  type: AppActions.SET_ICON,
  payload: icon,
});

export const setLanguage = (language: Language) => ({
  type: AppActions.SET_LANGUAGE,
  payload: language,
});

export const resetApp = () => ({
  type: AppActions.RESET_APP,
});
