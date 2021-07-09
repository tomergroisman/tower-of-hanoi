import {AppActions} from '../reducers/app';
import {setLanguage, setUser} from './app';

describe('User state actions tests', () => {
  it('should return a set user dispatch object', () => {
    const user = {email: 'test@test.com'};
    expect(setUser(user)).toEqual({
      type: AppActions.SET_USER,
      payload: user,
    });
  });
  it('should return a set language dispatch object', () => {
    const language = 'he';
    expect(setLanguage(language)).toEqual({
      type: AppActions.SET_LANGUAGE,
      payload: language,
    });
  });
});
