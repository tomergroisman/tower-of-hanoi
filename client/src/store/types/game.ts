export interface GameState {
  difficulty: Difficulty;
  pegs: number;
  discs: number;
  startPeg: number;
  startTime?: number;
}

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}
