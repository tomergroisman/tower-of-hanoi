import {difficultyToGameBoard} from '../../utils/gameBoard';
import {GameState, Difficulty} from '../types/game';

export enum GameActions {
  CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY',
  START_GAME = 'START_GAME',
}

type Payload = Difficulty;

export const initialState: GameState = {
  difficulty: Difficulty.EASY,
  ...difficultyToGameBoard(Difficulty.EASY),
  startPeg: 0,
};

export const gameStateReducer = (
  state: GameState = initialState,
  action?: {type: GameActions; payload?: Payload}
): GameState => {
  switch (action?.type) {
    case GameActions.CHANGE_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload as Difficulty,
        ...difficultyToGameBoard(action.payload as Difficulty),
      };

    case GameActions.START_GAME:
      return {
        ...state,
        startTime: Date.now(),
        startPeg: Math.floor(Math.random() * state.pegs),
      };

    default:
      return state;
  }
};
