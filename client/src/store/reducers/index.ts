import {combineReducers} from 'redux';
import {gameStateReducer as gameState} from './game';

export const rootReducer = combineReducers({
  gameState,
});
