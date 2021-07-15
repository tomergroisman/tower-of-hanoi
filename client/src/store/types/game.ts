export interface GameState {
  difficulty: Difficulty;
  discs: number;
  moves: number;
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
