import {Difficulty} from '../store/types/game';

export const PEGS = 3;

export const END_PEG = 2;

export const SECOND_IN_MILLIS = 1000;

const _apiHost = process.env.REACT_APP_API_ENDPOINT;

export const apiEndpoints = {
  getUser: `${_apiHost}/api/user/me/`,
  getToken: `${_apiHost}/api/user/token/`,
  createUser: `${_apiHost}/api/user/create/`,
  userRecords: `${_apiHost}/api/record/user/`,
  leaderboard: `${_apiHost}/api/record/leaderboard/`,
};

export const NUM_DIFFICULTIES = Object.keys(Difficulty).length / 2;

export const DISC_COLORS = ['#ff4d4d', '#00e600', '#4d4dff', '#cc33ff', '#ff9900'];

export const SIZES = {
  XLARGE: 1500,
  MEDIUM: 800,
  SMALL: 600,
  XSMALL: 450,
};
