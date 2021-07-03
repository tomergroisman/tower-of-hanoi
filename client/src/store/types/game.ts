export interface GameState {
  difficulty: Difficulty;
  pegs: number;
  discs: number;
  startPeg: number;
  board: Board;
  startTime?: number;
  finishTime?: number;
}

export interface Board {
  [key: string]: JSX.Element[];
}

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}
