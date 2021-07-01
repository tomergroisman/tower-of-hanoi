import {difficultyToGameBoard} from '../../utils/gameBoard';
import {GameState, Difficulty} from '../types/game';

export enum GAME_ACTIONS {
  CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY',
}

const initialState: GameState = {
  difficulty: Difficulty.EASY,
  ...difficultyToGameBoard(Difficulty.EASY),
};

export const gameStateReducer = (
  state: GameState = initialState,
  action: {type: GAME_ACTIONS; payload: Partial<GameState>}
) => {
  switch (action.type) {
    case GAME_ACTIONS.CHANGE_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
      };
    default:
      return state;
  }
};
