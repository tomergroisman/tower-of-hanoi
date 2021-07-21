import {cloneElement} from 'react';
import * as _ from 'lodash';

import {createBoard, difficultyToGameBoard} from '../../utils/gameBoard';
import {EndDrag} from '../types/actions';
import {GameState, Difficulty} from '../types/game';

export enum GameActions {
  CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY',
  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',
  MOVE_DISC = 'MOVE_DISC',
  RESET_GAME = 'RESET_GAME',
  NULL = '',
}

type Payload = Difficulty | EndDrag;

export const initialState: GameState = {
  difficulty: Difficulty.EASY,
  ...difficultyToGameBoard(Difficulty.EASY),
  moves: 0,
  startTime: undefined,
  finishTime: undefined,
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
      return {
        ...state,
        startTime: Date.now(),
        finishTime: undefined,
        moves: 0,
        board: createBoard(state.startPeg, state.discs),
      };

    case GameActions.END_GAME:
      return {
        ...state,
        finishTime: Date.now(),
      };

    case GameActions.MOVE_DISC:
      const {source, destination} = action.payload as EndDrag;

      const newDestination = _.cloneDeep(state.board[destination]);
      const newFirstDiscOnDestination = cloneElement(_.head(state.board[source]) as JSX.Element, {
        index: newDestination.length,
      });

      const newSource = _.cloneDeep(state.board[source]).splice(1);

      let newSecondDiscDestination = newDestination.shift();
      let newFirstDiscSource = newSource.shift();

      // Activate dragging property to the top disc
      if (newFirstDiscSource) {
        newFirstDiscSource = cloneElement(newFirstDiscSource, {isOnTop: true});
      }
      // Deactivate dragging property to the previous top disc
      if (newSecondDiscDestination) {
        newSecondDiscDestination = cloneElement(newSecondDiscDestination, {isOnTop: false});
      }

      return {
        ...state,
        moves: state.moves + 1,
        board: {
          ...state.board,
          [source]: _.compact([newFirstDiscSource, ...newSource]),
          [destination]: _.compact([
            newFirstDiscOnDestination,
            newSecondDiscDestination,
            ...newDestination,
          ]),
        },
      };

    case GameActions.RESET_GAME:
      return initialState;

    default:
      return state;
  }
};
