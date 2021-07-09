import {UserActions, userStateReducer as reducer} from './user';
import {UserState} from '../types/user';

describe('User state reducer tests', () => {
  const mockUser: UserState = {
    email: 'test@test.com',
    name: 'De Vinci',
    nickname: 'DeVi',
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the initial state', () => {
    const state = reducer(undefined);
    expect(state).toEqual(undefined);
  });

  it('should set a user', () => {
    const action = {
      type: UserActions.SET_USER,
      payload: {...mockUser, name: undefined},
    };

    const state = reducer(undefined, action);

    expect(state?.email).toEqual(mockUser.email);
    expect(state?.nickname).toEqual(mockUser.nickname);
    expect(state?.name).toBeUndefined();
  });
});
