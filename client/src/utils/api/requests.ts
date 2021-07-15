import {apiClient} from './api';
import {apiEndpoints} from '../constants';
import {Credentials, User} from '../../store/types/app';
import {Record} from './interfaces/Record';

interface ApiRequest {
  getUser: (token: string) => Promise<User>;
  getToken: (credentials: Credentials) => Promise<{token: string}>;
  createUser: (userData: Credentials) => Promise<{user: User}>;
  postRecord: (token: string, record: Record) => Promise<Record>;
}

const getAuthorizedHeaders = (token: string) => ({
  headers: {
    Authorization: `Token ${token}`,
  },
});

export const apiRequests: ApiRequest = {
  getUser: (token: string) => {
    return apiClient
      .get(apiEndpoints.getUser, getAuthorizedHeaders(token))
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
  postRecord: (token: string, record: Record) => {
    return apiClient
      .post(apiEndpoints.postRecord, record, getAuthorizedHeaders(token))
      .then(res => res.data as Record);
  },
};
