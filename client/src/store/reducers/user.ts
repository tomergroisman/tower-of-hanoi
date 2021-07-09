import {User, UserState} from '../types/user';

export enum UserActions {
  SET_USER = 'SET_USER',
}

type Payload = User;

export const initialState: UserState = {
  user: {
    email: undefined,
    name: undefined,
    nickname: undefined,
  },
};

export const userStateReducer = (
  state: UserState = initialState,
  action?: {type: UserActions; payload?: Payload}
): UserState => {
  switch (action?.type) {
    case UserActions.SET_USER:
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
