import {User, AppState} from '../types/app';

export enum AppActions {
  SET_USER = 'SET_USER',
}

type Payload = User;

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
          user: action.payload,
        };
      }
      return state;

    default:
      return state;
  }
};
