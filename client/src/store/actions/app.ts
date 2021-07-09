import {AppActions} from '../reducers/app';
import {User} from '../types/app';

export const setUser = (user: User) => ({
  type: AppActions.SET_USER,
  payload: user,
});
