import {User} from '../../store/types/app';
import {padBestRecordsWithUndefined} from '../arrays';
import {getIconFromName} from '../icon';
import {Leaderboard} from './interfaces/Leaderboard';
import {apiRequests} from './requests';

export const fetchUser = async (token: string) => {
  const user = await apiRequests.getUser(token);
  const bestRecords = await apiRequests.getBestRecords(token);
  return {
    ...user,
    bestRecords: padBestRecordsWithUndefined(bestRecords),
    icon: getIconFromName(user.icon),
  } as User;
};

export const fetchBestRecords = async (token: string) => {
  const bestRecords = await apiRequests.getBestRecords(token);
  return padBestRecordsWithUndefined(bestRecords);
};

export const fetchLeaderboard = async (
  token: string,
  level: number,
  limit: number,
  page: number
) => {
  const fetchedLeaderboard = await apiRequests.getLeaderboard(token, level, limit, page);
  const leaderboard: Leaderboard = {
    ...fetchedLeaderboard,
    results: fetchedLeaderboard.results.map(record => ({
      ...record,
      icon: getIconFromName(record.icon),
    })),
  };
  return leaderboard;
};
