import {createBoard, difficultyToGameBoard} from '../../utils/gameBoard';
import {EndDrag} from '../types/actions';
import {GameState, Difficulty} from '../types/game';

export enum GameActions {
  CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY',
  START_GAME = 'START_GAME',
  MOVE_DISC = 'MOVE_DISC',
}

type Payload = Difficulty | EndDrag;

export const initialState: GameState = {
  difficulty: Difficulty.EASY,
  ...difficultyToGameBoard(Difficulty.EASY),
  startPeg: 0,
  board: {},
};

export const gameStateReducer = (
  state: GameState = initialState,
  action?: {type: GameActions; payload?: Payload}
): GameState => {
  switch (action?.type) {
    case GameActions.CHANGE_DIFFICULTY:
      const difficulty = action.payload as Difficulty;

      return {
        ...state,
        difficulty: difficulty,
        ...difficultyToGameBoard(difficulty),
      };

    case GameActions.START_GAME:
      const startPeg = Math.floor(Math.random() * state.pegs);

      return {
        ...state,
        startTime: Date.now(),
        startPeg: startPeg,
        board: createBoard(startPeg, state.pegs, state.discs),
      };

    case GameActions.MOVE_DISC:
      const {source, destination} = action.payload as EndDrag;
      const disc = state.board[source][0];

      if (state.board[source].length > 0) {
        return {
          ...state,
          board: {
            ...state.board,
            [source]: [...state.board[source].splice(1)],
            [destination]: [disc, ...state.board[destination]],
          },
        };
      }
      return state;

    default:
      return state;
  }
};
