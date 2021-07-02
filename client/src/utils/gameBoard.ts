import {Difficulty} from '../store/types/game';

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
