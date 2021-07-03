export interface GameState {
  difficulty: Difficulty;
  pegs: number;
  discs: number;
  startPeg: number;
  startTime?: number;
  board: Board;
}

export interface Board {
  [key: string]: JSX.Element[];
}

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}
