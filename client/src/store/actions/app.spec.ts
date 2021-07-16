import {AppActions} from '../reducers/app';
import {setLanguage, setUser, setBestRecords} from './app';
import {Record} from '../../utils/api/interfaces/Record';

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

  it('should return a set best records dispatch object', () => {
    const bestRecords: Record[] = [];
    expect(setBestRecords(bestRecords)).toEqual({
      type: AppActions.SET_BEST_RECORDS,
      payload: bestRecords,
    });
  });
});
