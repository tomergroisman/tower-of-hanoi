import {AppActions, appStateReducer as reducer} from './app';
import {Language, User} from '../types/app';
import {Record} from '../../utils/api/interfaces/Record';

describe('App state reducer tests', () => {
  const mockUser: User = {
    email: 'test@test.com',
    name: 'De Vinci',
    nickname: 'DeVi',
  };
  let getTheme: any;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(require('../../utils/theme'), 'getTheme');
    getTheme = require('../../utils/theme').getTheme;
  });

  it('should return the initial state', () => {
    const state = reducer(undefined);
    expect(state).toMatchObject({
      user: {},
      language: 'en',
    });
  });

  it('should set a user', () => {
    const action = {
      type: AppActions.SET_USER,
      payload: {...mockUser, name: undefined},
    };

    const state = reducer(undefined, action);

    expect(state.user.email).toEqual(mockUser.email);
    expect(state.user.nickname).toEqual(mockUser.nickname);
    expect(state.user.name).toBeUndefined();
  });

  it('should set a new best records array', () => {
    const bestRecords: Record[] = [];
    const action = {
      type: AppActions.SET_BEST_RECORDS,
      payload: bestRecords,
    };

    const state = reducer(undefined, action);

    expect(state.user.bestRecords).toEqual(bestRecords);
  });

  it('should set a language', () => {
    const language: Language = 'he';
    const action = {
      type: AppActions.SET_LANGUAGE,
      payload: language,
    };

    const state = reducer(undefined, action);

    expect(getTheme).toHaveBeenCalledWith(language);
    expect(state.language).toEqual(language);
  });
});
