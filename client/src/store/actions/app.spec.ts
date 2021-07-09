import {AppActions} from '../reducers/app';
import {setUser} from './app';

describe('User state actions tests', () => {
  it('should return a set user dispatch object', () => {
    const user = {email: 'test@test.com'};
    expect(setUser(user)).toEqual({
      type: AppActions.SET_USER,
      payload: user,
    });
  });
});
