import {GameActions, gameStateReducer as reducer, initialState} from './game';

import {Difficulty} from '../types/game';
import {createBoard} from '../../utils/gameBoard';

describe('Game state reducer tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

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

    jest.spyOn(require('../../utils/gameBoard'), 'createBoard');

    const state = reducer(prevState, action);

    expect(state.startTime).toBeDefined();
    expect(createBoard).toBeCalledWith(0, 3);
  });

  it('should end the game', () => {
    const prevState = {
      ...initialState,
      startTime: 0,
    };
    const action = {
      type: GameActions.END_GAME,
    };

    const state = reducer(prevState, action);

    expect(state.finishTime).toBeDefined();
  });

  it('should move disc', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
      board: createBoard(0, 3),
    };

    expect(prevState.board?.['peg-0'].length).toEqual(3);
    expect(prevState.board?.['peg-1'].length).toEqual(0);
    expect(prevState.board?.['peg-2'].length).toEqual(0);

    const action = {
      type: GameActions.MOVE_DISC,
      payload: {
        source: 'peg-0',
        destination: 'peg-1',
      },
    };

    const state = reducer(prevState, action);

    expect(state.board?.['peg-0'].length).toEqual(2);
    expect(state.board?.['peg-1'].length).toEqual(1);
    expect(state.board?.['peg-2'].length).toEqual(0);
  });

  it('should change disc index', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
      board: createBoard(0, 3),
    };

    expect(prevState.board?.['peg-0'][0].props.index).toEqual(2);

    let state = reducer(prevState, {
      type: GameActions.MOVE_DISC,
      payload: {source: 'peg-0', destination: 'peg-1'},
    });
    state = reducer(state, {
      type: GameActions.MOVE_DISC,
      payload: {source: 'peg-0', destination: 'peg-2'},
    });
    state = reducer(state, {
      type: GameActions.MOVE_DISC,
      payload: {source: 'peg-1', destination: 'peg-0'},
    });

    expect(state.board?.['peg-0'][0].props.index).toEqual(1);
  });

  it('should reset the game state', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
      startTime: 0,
      board: createBoard(0, 3),
    };

    const state = reducer(prevState, {type: GameActions.RESET_GAME});

    expect(state.startTime).toBeUndefined();
  });

  it('should make two moves', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
      board: createBoard(0, 3),
    };

    let state = reducer(prevState, {
      type: GameActions.MOVE_DISC,
      payload: {source: 'peg-0', destination: 'peg-1'},
    });
    state = reducer(state, {
      type: GameActions.MOVE_DISC,
      payload: {source: 'peg-0', destination: 'peg-2'},
    });

    expect(state.moves).toEqual(2);
  });
});
