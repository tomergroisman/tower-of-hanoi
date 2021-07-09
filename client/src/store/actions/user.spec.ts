import {UserActions} from '../reducers/user';
import {setUser} from './user';

describe('User state actions tests', () => {
  it('should return a set user dispatch object', () => {
    const user = {email: 'test@test.com'};
    expect(setUser(user)).toEqual({
      type: UserActions.SET_USER,
      payload: user,
    });
  });
});
