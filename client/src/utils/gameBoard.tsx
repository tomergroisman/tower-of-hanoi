import {Board, Difficulty} from '../store/types/game';
import {Disc} from '../components/Disc';

export const difficultyToGameBoard = (difficulty: Difficulty): {pegs: number; discs: number} => {
  switch (difficulty) {
    case Difficulty.EASY: {
      return {
        pegs: 3,
        discs: 3,
      };
    }
    case Difficulty.MEDIUM: {
      return {
        pegs: 4,
        discs: 4,
      };
    }
    case Difficulty.HARD: {
      return {
        pegs: 5,
        discs: 5,
      };
    }
  }
};

export const createBoard = (startPeg: number, pegs: number, discs: number): Board => {
  let board: Board = {};
  for (let i = 0; i < pegs; i++) {
    board[`peg-${i}`] = [];
    if (i === startPeg) {
      for (let j = discs - 1; j >= 0; j--) {
        board[`peg-${i}`].push(<Disc key={`disc-${j}`} index={j} discs={discs} />);
      }
    }
  }

  return board;
};
