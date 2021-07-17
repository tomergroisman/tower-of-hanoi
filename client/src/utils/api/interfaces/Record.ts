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
};
