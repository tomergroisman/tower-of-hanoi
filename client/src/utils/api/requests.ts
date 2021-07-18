import {apiClient} from './api';
import {apiEndpoints} from '../constants';
import {Credentials, User} from '../../store/types/app';
import {LeaderboardRecord, Record} from './interfaces/Record';
import {ApiResponse} from './interfaces/Response';
import {UserApi} from './interfaces/UserApi';

interface ApiRequest {
  getUser: (token: string) => Promise<Partial<UserApi>>;
  updateUser: (token: string, data: Partial<UserApi>) => Promise<Partial<UserApi>>;
  getToken: (credentials: Credentials) => Promise<{token: string}>;
  createUser: (userData: Credentials) => Promise<{user: User}>;
  postRecord: (token: string, record: Record) => Promise<Record>;
  getBestRecords: (token: string) => Promise<Record[]>;
  getLeaderboard: (
    token: string,
    level?: number,
    limit?: number,
    offset?: number
  ) => Promise<ApiResponse<LeaderboardRecord[]>>;
}

const getAuthorizedHeaders = (token: string) => ({
  headers: {
    Authorization: `Token ${token}`,
  },
});

export const apiRequests: ApiRequest = {
  getUser: (token: string) => {
    return apiClient
      .get<UserApi>(apiEndpoints.getUser, getAuthorizedHeaders(token))
      .then(res => res.data);
  },
  getToken: (credentials: Credentials) => {
    return apiClient
      .post<{token: string}>(apiEndpoints.getToken, credentials)
      .then(res => res.data);
  },
  createUser: (userData: Credentials) => {
    return apiClient.post<{user: User}>(apiEndpoints.createUser, userData).then(res => res.data);
  },
  postRecord: (token: string, record: Record) => {
    return apiClient
      .post<Record>(apiEndpoints.userRecords, record, getAuthorizedHeaders(token))
      .then(res => res.data);
  },
  getBestRecords: (token: string) => {
    return apiClient
      .get<ApiResponse<Record[]>>(apiEndpoints.userRecords, {
        ...getAuthorizedHeaders(token),
        params: {
          best_records: 1,
        },
      })
      .then(res => res.data.results);
  },
  getLeaderboard: (token: string, level: number = 1, limit: number = 20, offset: number = 1) => {
    return apiClient
      .get<ApiResponse<LeaderboardRecord[]>>(apiEndpoints.leaderboard, {
        ...getAuthorizedHeaders(token),
        params: {
          level,
          limit,
          offset,
        },
      })
      .then(res => res.data);
  },
  updateUser: (token: string, data: Partial<UserApi>) => {
    return apiClient
      .patch<UserApi>(apiEndpoints.getUser, data, getAuthorizedHeaders(token))
      .then(res => res.data);
  },
};
