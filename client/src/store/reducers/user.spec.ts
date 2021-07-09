import {UserActions, userStateReducer as reducer} from './user';
import {User} from '../types/user';

describe('User state reducer tests', () => {
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
      user: {
        email: undefined,
        name: undefined,
        nickname: undefined,
      },
    });
  });

  it('should set a user', () => {
    const action = {
      type: UserActions.SET_USER,
      payload: {...mockUser, name: undefined},
    };

    const state = reducer(undefined, action);

    expect(state.user.email).toEqual(mockUser.email);
    expect(state.user.nickname).toEqual(mockUser.nickname);
    expect(state.user.name).toBeUndefined();
  });
});
