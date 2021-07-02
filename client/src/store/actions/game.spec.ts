import {GameActions} from '../reducers/game';
import {Difficulty} from '../types/game';
import {changeDifficulty, decreaseDifficulty, increaseDifficulty, startGame} from './game';

const setStateDifficulty = (difficulty: Difficulty) => {
  const store = require('../index').store;
  jest.spyOn(store, 'getState').mockReturnValue({
    gameState: {
      difficulty: difficulty,
    },
  });
};

describe('Game state actions tests', () => {
  describe('Difficulty actions tests', () => {
    it('should return a difficulty change dispatch object', () => {
      const difficulty = Difficulty.MEDIUM;
      expect(changeDifficulty(difficulty)).toEqual({
        type: GameActions.CHANGE_DIFFICULTY,
        payload: difficulty,
      });
    });

    it('should return an increased game difficulty dispatch object', () => {
      const difficulty = Difficulty.MEDIUM;
      setStateDifficulty(difficulty);

      expect(increaseDifficulty()).toEqual({
        type: GameActions.CHANGE_DIFFICULTY,
        payload: difficulty + 1,
      });
    });

    it('should return an decreased game difficulty dispatch object', () => {
      const difficulty = Difficulty.MEDIUM;
      setStateDifficulty(difficulty);

      expect(decreaseDifficulty()).toEqual({
        type: GameActions.CHANGE_DIFFICULTY,
        payload: difficulty - 1,
      });
    });

    it('should return the same difficulty dispatch object if reached the limit (increment)', () => {
      const difficulty = Difficulty.HARD;
      setStateDifficulty(difficulty);

      expect(increaseDifficulty()).toEqual({
        type: GameActions.CHANGE_DIFFICULTY,
        payload: difficulty,
      });
    });

    it('should return the same difficulty dispatch object if reached the limit (decrement)', () => {
      const difficulty = Difficulty.EASY;
      setStateDifficulty(difficulty);

      expect(decreaseDifficulty()).toEqual({
        type: GameActions.CHANGE_DIFFICULTY,
        payload: difficulty,
      });
    });
  });

  describe('Time actions tests', () => {
    it('should return set start time dispatch object', () => {
      expect(startGame()).toEqual({
        type: GameActions.START_GAME,
      });
    });
  });
});
