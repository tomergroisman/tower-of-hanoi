import {Difficulty} from '../store/types/game';
import {createBoard, isValidateMove} from './gameBoard';

describe('gameBoard Tests', () => {
  const {difficultyToGameBoard} = require('./gameBoard');

  it('should return easy board game', () => {
    const easyBoard = {discs: 3};
    expect(difficultyToGameBoard(Difficulty.EASY)).toEqual(easyBoard);
  });

  it('should return medium board game', () => {
    const mediumBoard = {discs: 4};
    expect(difficultyToGameBoard(Difficulty.MEDIUM)).toEqual(mediumBoard);
  });

  it('should return hard board game', () => {
    const hardBoard = {discs: 5};
    expect(difficultyToGameBoard(Difficulty.HARD)).toEqual(hardBoard);
  });

  it('should return a game board', () => {
    const board = createBoard(0, 3);
    expect(Object.keys(board).length).toEqual(3);
    expect(board['peg-0'].length).toEqual(3);
    expect(board['peg-1'].length).toEqual(0);
    expect(board['peg-2'].length).toEqual(0);
    expect(board['peg-3']).toBeUndefined();
  });

  it('should calculate a valid move', () => {
    const board = createBoard(0, 3);
    expect(isValidateMove('peg-0', 'peg-1', board)).toBeTruthy();
  });

  it('should calculate an invalid move (larger disc)', () => {
    const board = createBoard(0, 3);
    board['peg-1'].push(board['peg-0'].shift() as JSX.Element);
    expect(isValidateMove('peg-0', 'peg-1', board)).toBeFalsy();
  });

  it('should calculate an invalid move (same peg)', () => {
    const board = createBoard(0, 3);
    expect(isValidateMove('peg-0', 'peg-0', board)).toBeFalsy();
  });
});
