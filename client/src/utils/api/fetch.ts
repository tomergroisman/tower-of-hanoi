import {User} from '../../store/types/app';
import {padBestRecordsWithUndefined} from '../arrays';
import {getIconFromName} from '../icon';
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
