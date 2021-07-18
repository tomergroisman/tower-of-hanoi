import {Difficulty} from '../store/types/game';

export const PEGS = 3;

export const SECOND_IN_MILLIS = 1000;

export const ENV_PREFIX = process.env.NODE_ENV === 'development' ? 'REACT_APP_' : '';

const _apiHost = process.env[`${ENV_PREFIX}API_ENDPOINT`];

export const apiEndpoints = {
  getUser: `${_apiHost}/api/user/me/`,
  getToken: `${_apiHost}/api/user/token/`,
  createUser: `${_apiHost}/api/user/create/`,
  userRecords: `${_apiHost}/api/record/user/`,
  leaderboard: `${_apiHost}/api/record/leaderboard/`,
};

export const NUM_DIFFICULTIES = Object.keys(Difficulty).length / 2;

export const DISC_COLORS = ['red', 'green', 'blue', '#cc33ff', '#ff9900'];

export const SIZES = {
  LARGE: 1500,
  MEDIUM: 1000,
  SMALL: 600,
  XSMALL: 450,
};
