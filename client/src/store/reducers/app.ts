import {User, AppState, Language} from '../types/app';

export enum AppActions {
  SET_USER = 'SET_USER',
  SET_LANGUAGE = 'SET_LANGUAGE',
}

type Payload = User | Language;

export const initialState: AppState = {
  user: {},
  language: 'en',
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

    case AppActions.SET_LANGUAGE:
      if (action.payload) {
        return {
          ...state,
          language: action.payload as Language,
        };
      }
      return state;

    default:
      return state;
  }
};
