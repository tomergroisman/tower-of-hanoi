import {store} from '../index';
import {GameActions} from '../reducers/game';
import {Difficulty} from '../types/game';

const NUM_DIFFICULTIES = Object.keys(Difficulty).length / 2;

export const changeDifficulty = (difficulty: Difficulty) => ({
  type: GameActions.CHANGE_DIFFICULTY,
  payload: difficulty,
});

export const increaseDifficulty = () => {
  const currentDifficult = store.getState().gameState.difficulty;
  return changeDifficulty(
    currentDifficult + 1 <= NUM_DIFFICULTIES - 1 ? currentDifficult + 1 : currentDifficult
  );
};

export const decreaseDifficulty = () => {
  const currentDifficult = store.getState().gameState.difficulty;
  return changeDifficulty(currentDifficult - 1 >= 0 ? currentDifficult - 1 : currentDifficult);
};

export const startGame = () => {
  return {
    type: GameActions.START_GAME,
  };
};

export const moveDisc = (source: string, destination: string) => {
  return {
    type: GameActions.MOVE_DISC,
    payload: {source, destination},
  };
};
