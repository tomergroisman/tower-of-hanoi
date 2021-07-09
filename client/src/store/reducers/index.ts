import {combineReducers} from 'redux';
import {gameStateReducer as gameState} from './game';
import {appStateReducer as appState} from './app';

export const rootReducer = combineReducers({
  gameState,
  appState,
});
