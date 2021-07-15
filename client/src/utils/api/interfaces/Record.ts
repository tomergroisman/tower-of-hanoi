export interface Record {
  level: number;
  time: string;
  moves: number;
}
export type LeaderboardRecord = Record & {
  id: number;
  date: string;
  nickname: string;
};
