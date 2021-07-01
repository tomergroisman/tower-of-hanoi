import {GameActions, gameStateReducer as reducer, initialState} from './game';

import {Difficulty} from '../types/game';

describe('Game state reducer tests', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined);
    expect(state).toEqual(initialState);
  });

  it('should change the game difficulty', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
    };
    const action = {
      type: GameActions.CHANGE_DIFFICULTY,
      payload: Difficulty.HARD,
    };

    const state = reducer(prevState, action);

    expect(state.difficulty).toEqual(Difficulty.HARD);
  });

  it('should start the game', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
    };
    const action = {
      type: GameActions.START_GAME,
    };

    jest.spyOn(Date, 'now').mockReturnValue(1);
    jest.spyOn(Math, 'random');
    jest.spyOn(Math, 'floor');

    const state = reducer(prevState, action);
    expect(state.startTime).toEqual(1);
    expect(Math.random).toBeCalled();
    expect(Math.floor).toBeCalled();
  });
});
