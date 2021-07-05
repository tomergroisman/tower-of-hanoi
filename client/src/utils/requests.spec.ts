import {apiClient} from './api';
import {ENV_PREFIX} from './constants';
import {apiRequests} from './requests';

describe('Requests tests', () => {
  beforeEach(() => {
    jest.spyOn(require('./api').apiClient, 'get').mockResolvedValue('');
    jest.spyOn(require('./api').apiClient, 'post').mockResolvedValue('');
  });

  it('should make a get user request', async () => {
    const mockToken = '1';
    await apiRequests.getUser(mockToken);

    const endpoint = `${process.env[`${ENV_PREFIX}API_ENDPOINT`]}/api/user/me/`;
    expect(apiClient.get).toBeCalled();
    expect(apiClient.get).toHaveBeenCalledWith(endpoint, {
      headers: {Authorization: mockToken},
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
});
