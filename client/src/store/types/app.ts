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

export type ErrorFields = 'email' | 'password' | 'nickname';

export interface Credentials {
  email: string;
  password: string;
  nickname?: string;
}
