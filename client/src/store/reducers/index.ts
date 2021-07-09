import {combineReducers} from 'redux';
import {gameStateReducer as gameState} from './game';
import {userStateReducer as userState} from './user';

export const rootReducer = combineReducers({
  gameState,
  userState,
});
