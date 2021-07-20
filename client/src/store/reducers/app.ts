import {UserIcon} from '../../components/UserIconSet/interface/UserIcon';
import {Record} from '../../utils/api/interfaces/Record';
import {rehydrate} from '../../utils/rehydrate';
import {getTheme} from '../../utils/theme';
import {User, AppState, Language} from '../types/app';

export enum AppActions {
  SET_USER = 'SET_USER',
  SET_BEST_RECORDS = 'SET_BEST_RECORDS',
  SET_ICON = 'SET_ICON',
  SET_LANGUAGE = 'SET_LANGUAGE',
  SET_PATH = 'SET_PATH',
  RESET_APP = 'RESET_APP',
}

type Payload = User | Language | Record[] | UserIcon | undefined;

export const initialState: AppState = {
  language: rehydrate.language(),
  theme: getTheme(rehydrate.language()),
  path: window.location.pathname,
};

export const appStateReducer = (
  state: AppState = initialState,
  action?: {type: AppActions; payload?: Payload}
): AppState => {
  switch (action?.type) {
    case AppActions.SET_USER:
      if (action.payload) {
        return {
          ...state,
          user: action.payload as User,
        };
      }
      return state;

    case AppActions.SET_BEST_RECORDS:
      if (action.payload) {
        const bestRecords = action.payload as Record[];
        return {
          ...state,
          user: {
            ...state.user,
            bestRecords,
          },
        };
      }
      return state;

    case AppActions.SET_LANGUAGE:
      if (action.payload) {
        const language = action.payload as Language;
        return {
          ...state,
          language: language,
          theme: getTheme(language),
        };
      }
      return state;

    case AppActions.SET_ICON:
      if (action.payload) {
        const icon = action.payload as UserIcon | undefined;
        return {
          ...state,
          user: {
            ...state.user,
            icon,
          },
        };
      }
      return state;

    case AppActions.SET_PATH:
      if (action.payload) {
        const path = action.payload as string;
        return {
          ...state,
          path,
        };
      }
      return state;

    case AppActions.RESET_APP:
      return initialState;

    default:
      return state;
  }
};
