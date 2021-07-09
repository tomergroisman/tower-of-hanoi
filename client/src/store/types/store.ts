import {GameState} from './game';
import {UserState} from './user';

export interface Store {
  gameState: GameState;
  userState: UserState
}
