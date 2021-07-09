export interface AppState {
  user: User;
  language: 'en' | 'he';
}

export interface User {
  email?: string;
  name?: string;
  nickname?: string;
}

export type ErrorFields = 'email' | 'password' | 'nickname';

export interface Credentials {
  email: string;
  password: string;
  nickname?: string;
}
