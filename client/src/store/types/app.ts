export interface AppState {
  user: User;
  language: Language;
}

export interface User {
  email?: string;
  name?: string;
  nickname?: string;
}

export type Language = 'he' | 'en';

export interface ErrorFields {
  email?: string[];
  password?: string[];
  nickname?: string[];
}

export interface Credentials {
  email: string;
  password: string;
  nickname?: string;
}
