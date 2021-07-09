export interface User {
  email?: string;
  name?: string;
  nickname?: string;
}

export interface UserState {
  user: User;
}

export type ErrorFields = 'email' | 'password' | 'nickname';

export interface Credentials {
  email: string;
  password: string;
  nickname?: string;
}
