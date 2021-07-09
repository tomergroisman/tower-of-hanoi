import {AppActions, appStateReducer as reducer} from './app';
import {Language, User} from '../types/app';

describe('App state reducer tests', () => {
  const mockUser: User = {
    email: 'test@test.com',
    name: 'De Vinci',
    nickname: 'DeVi',
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the initial state', () => {
    const state = reducer(undefined);
    expect(state).toEqual({
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

  it('should set a language', () => {
    const language: Language = 'he';
    const action = {
      type: AppActions.SET_LANGUAGE,
      payload: language,
    };

    const state = reducer(undefined, action);

    expect(state.language).toEqual(language);
  });
});