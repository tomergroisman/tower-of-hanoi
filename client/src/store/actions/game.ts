import {GAME_ACTIONS} from '../reducers/game';
import {Difficulty} from '../types/game';

export const changeDifficulty = (difficulty: Difficulty) => ({
  type: GAME_ACTIONS.CHANGE_DIFFICULTY,
  payload: difficulty,
});
