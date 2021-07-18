import {Record} from '../../utils/api/interfaces/Record';
import {rehydrate} from '../../utils/rehydrate';
import {getTheme} from '../../utils/theme';
import {User, AppState, Language} from '../types/app';

export enum AppActions {
  SET_USER = 'SET_USER',
  SET_BEST_RECORDS = 'SET_BEST_RECORDS',
  SET_LANGUAGE = 'SET_LANGUAGE',
  RESET_APP = 'RESET_APP',
}

type Payload = User | Language | Record[];

export const initialState: AppState = {
  user: {},
  language: rehydrate.language(),
  theme: getTheme(rehydrate.language()),
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

    case AppActions.RESET_APP:
      return initialState;

    default:
      return state;
  }
};
