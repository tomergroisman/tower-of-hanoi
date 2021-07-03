import * as _ from 'lodash';

import {Board, Difficulty} from '../store/types/game';
import {Disc} from '../components/Disc';
import {PEGS} from './constants';

/**
 * Returns a difficulty string representation of Difficulty enum
 *
 * @param difficulty - difficulty enum object
 * @returns a difficulty string representation
 */
export const difficultyToGameBoard = (difficulty: Difficulty): {discs: number} => {
  switch (difficulty) {
    case Difficulty.EASY: {
      return {
        discs: 3,
      };
    }
    case Difficulty.MEDIUM: {
      return {
        discs: 4,
      };
    }
    case Difficulty.HARD: {
      return {
        discs: 5,
      };
    }
  }
};

/**
 * Crate an initial game board object
 *
 * @param startPeg - the startling peg of the game
 * @param pegs - number on pegs
 * @param discs - number of discs
 * @returns an initial game board object
 */
export const createBoard = (startPeg: number, discs: number): Board => {
  let board: Board = {};
  for (let i = 0; i < PEGS; i++) {
    board[`peg-${i}`] = [];
    if (i === startPeg) {
      for (let j = 0; j < discs; j++) {
        board[`peg-${i}`].push(
          <Disc key={`disc-${j}`} size={j} index={discs - 1 - j} isOnTop={j === 0} />
        );
      }
    }
  }

  return board;
};

export const isValidateMove = (source: string, destination: string, board: Board) => {
  if (source === destination) {
    return false;
  }

  const topSource = _.head(board[source]);
  const topDestination = _.head(board[destination]);
  if (topSource?.props.size > topDestination?.props.size) {
    return false;
  }

  return true;
};
