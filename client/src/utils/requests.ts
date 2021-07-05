import {apiClient} from './api';
import {apiEndpoints} from './constants';
import {Credentials, User} from '../store/types/user';

interface ApiRequest {
  getUser: (token: string) => Promise<User | undefined>;
  getToken: (credentials: Credentials) => Promise<{token: string} | undefined>;
}

export const apiRequests: ApiRequest = {
  getUser: (token: string) => {
    return apiClient
      .get(apiEndpoints.getUser, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(res => (res.status === 200 ? (res.data as User) : undefined));
  },
  getToken: (credentials: Credentials) => {
    return apiClient
      .post(apiEndpoints.getToken, credentials)
      .then(res => (res.status === 200 ? (res.data as {token: string}) : undefined));
  },
};
