import {Difficulty} from '../store/types/game';

describe('gameBoard Tests', () => {
  const {difficultyToGameBoard} = require('./gameBoard');

  it('should return easy board game', () => {
    const easyBoard = {
      pegs: 3,
      discs: 3,
    };
    expect(difficultyToGameBoard(Difficulty.EASY)).toEqual(easyBoard);
  });
  it('should return medium board game', () => {
    const mediumBoard = {
      pegs: 4,
      discs: 4,
    };
    expect(difficultyToGameBoard(Difficulty.MEDIUM)).toEqual(mediumBoard);
  });
  it('should return hard board game', () => {
    const hardBoard = {
      pegs: 5,
      discs: 5,
    };
    expect(difficultyToGameBoard(Difficulty.HARD)).toEqual(hardBoard);
  });
});
