import {UserActions} from '../reducers/user';
import {User} from '../types/user';

export const setUser = (user: User) => ({
  type: UserActions.SET_USER,
  payload: user,
});
