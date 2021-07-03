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
    jest.spyOn(Math, 'random').mockReturnValue(0);
    jest.spyOn(Math, 'floor');

    const state = reducer(prevState, action);

    expect(state.startTime).toBeDefined();
    expect(createBoard).toBeCalledWith(0, 3, 3);
    expect(Math.random).toBeCalled();
    expect(Math.floor).toBeCalled();
  });

  it('should move disc', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
      board: createBoard(0, 3, 3),
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

  it('should change disc index disc', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
      board: createBoard(0, 3, 3),
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

  it('should finish the game', () => {
    const prevState = {
      ...initialState,
      difficulty: Difficulty.EASY,
      board: createBoard(0, 3, 3),
      startPeg: 1,
    };

    expect(prevState.finishTime).toBeUndefined();

    let state = reducer(prevState, {
      type: GameActions.MOVE_DISC,
      payload: {source: 'peg-0', destination: 'peg-1'},
    });
    state = reducer(state, {
      type: GameActions.MOVE_DISC,
      payload: {source: 'peg-1', destination: 'peg-0'},
    });

    expect(state.finishTime).toBeDefined();
  });
});
