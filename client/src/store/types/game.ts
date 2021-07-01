export interface GameState {
  difficulty: Difficulty;
  pegs: number;
  discs: number;
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
