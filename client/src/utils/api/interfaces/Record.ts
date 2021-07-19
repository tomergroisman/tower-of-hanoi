import {UserIcon} from '../../../components/UserIconSet/interface/UserIcon';

export interface Record {
  level: number;
  time: string;
  moves: number;
  date?: string;
}
export type LeaderboardRecord = Record & {
  id: number;
  date: string;
  nickname: string;
  icon?: UserIcon;
};
export interface LeaderboardRecordApi extends Omit<LeaderboardRecord, 'icon'> {
  icon: string | null;
}
