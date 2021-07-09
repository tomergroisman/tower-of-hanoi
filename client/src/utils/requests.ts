import {apiClient} from './api';
import {apiEndpoints} from './constants';
import {Credentials, User} from '../store/types/user';

interface ApiRequest {
  getUser: (token: string) => Promise<User>;
  getToken: (credentials: Credentials) => Promise<{token: string}>;
  createUser: (userData: Credentials) => Promise<{user: User}>;
}

export const apiRequests: ApiRequest = {
  getUser: (token: string) => {
    return apiClient
      .get(apiEndpoints.getUser, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(res => res.data as User);
  },
  getToken: (credentials: Credentials) => {
    return apiClient
      .post(apiEndpoints.getToken, credentials)
      .then(res => res.data as {token: string});
  },
  createUser: (userData: Credentials) => {
    return apiClient.post(apiEndpoints.createUser, userData).then(res => res.data as {user: User});
  },
};
