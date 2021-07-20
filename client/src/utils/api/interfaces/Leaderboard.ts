import {UserIcon} from '../../../components/UserIconSet/interface/UserIcon';
import {Record} from './Record';
import {ApiResponse} from './Response';

export type LeaderboardRecord = Record & {
  id: number;
  date: string;
  nickname: string;
  icon?: UserIcon;
};

export type Leaderboard = ApiResponse<LeaderboardRecord[]>;

export interface LeaderboardRecordApi extends Omit<LeaderboardRecord, 'icon'> {
  icon: string | null;
}
