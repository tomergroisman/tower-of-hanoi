export const PEGS = 3;

export const SECOND_IN_MILLIS = 1000;

export const ENV_PREFIX = process.env.NODE_ENV === 'development' ? 'REACT_APP_' : '';

const _apiHost = process.env[`${ENV_PREFIX}API_ENDPOINT`];

export const apiEndpoints = {
  getUser: `${_apiHost}/api/user/me/`,
  getToken: `${_apiHost}/api/user/token/`,
  createUser: `${_apiHost}/api/user/create/`,
  postRecord: `${_apiHost}/api/record/user/`,
};
