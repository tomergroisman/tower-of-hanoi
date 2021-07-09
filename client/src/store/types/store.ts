import {GameState} from './game';
import {AppState} from './app';

export interface Store {
  gameState: GameState;
  appState: AppState;
}
