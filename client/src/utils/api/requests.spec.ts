import {apiClient} from './api';
import {ENV_PREFIX} from '../constants';
import {apiRequests} from './requests';

describe('Requests tests', () => {
  beforeEach(() => {
    jest.spyOn(require('./api').apiClient, 'get').mockResolvedValue({data: {results: ''}});
    jest.spyOn(require('./api').apiClient, 'post').mockResolvedValue({data: {results: ''}});
  });

  it('should make a get user request', async () => {
    const mockToken = '1';
    await apiRequests.getUser(mockToken);

    const endpoint = `${process.env[`${ENV_PREFIX}API_ENDPOINT`]}/api/user/me/`;
    expect(apiClient.get).toBeCalled();
    expect(apiClient.get).toHaveBeenCalledWith(endpoint, {
      headers: {Authorization: `Token ${mockToken}`},
    });
  });

  it('should make a get token request', () => {
    const credentials = {
      email: 'test@test.com',
      password: '123456',
    };
    apiRequests.getToken(credentials);

    const endpoint = `${process.env[`${ENV_PREFIX}API_ENDPOINT`]}/api/user/token/`;
    expect(apiClient.post).toHaveBeenCalledWith(endpoint, credentials);
  });

  it('should make a create user request', () => {
    const user = {
      email: 'test@test.com',
      password: '123456',
      nickname: 'test',
    };
    apiRequests.createUser(user);

    const endpoint = `${process.env[`${ENV_PREFIX}API_ENDPOINT`]}/api/user/create/`;
    expect(apiClient.post).toHaveBeenCalledWith(endpoint, user);
  });

  it('should make a post record request', () => {
    const record = {
      level: 1,
      time: '00:00:09',
      moves: 7,
    };
    const mockToken = '1';
    const headers = {
      headers: {Authorization: `Token ${mockToken}`},
    };

    apiRequests.postRecord(mockToken, record);

    const endpoint = `${process.env[`${ENV_PREFIX}API_ENDPOINT`]}/api/record/user/`;
    expect(apiClient.post).toHaveBeenCalledWith(endpoint, record, headers);
  });

  it('should make a get best records request', () => {
    const mockToken = '1';
    const config = {
      headers: {Authorization: `Token ${mockToken}`},
      params: {
        best_records: 1,
      },
    };

    apiRequests.getBestRecords(mockToken);

    const endpoint = `${process.env[`${ENV_PREFIX}API_ENDPOINT`]}/api/record/user/`;
    expect(apiClient.get).toHaveBeenCalledWith(endpoint, config);
  });

  it('should make a get leaderboard request', () => {
    const mockToken = '1';
    const config = {
      headers: {Authorization: `Token ${mockToken}`},
      params: {
        level: 2,
        page: 1,
      },
    };

    apiRequests.getLeaderboard(mockToken, 2);

    const endpoint = `${process.env[`${ENV_PREFIX}API_ENDPOINT`]}/api/record/leaderboard/`;
    expect(apiClient.get).toHaveBeenCalledWith(endpoint, config);
  });
});
