export interface User {
  email: string;
  name?: string;
  nickname?: string;
}

export type UserState = User | undefined;

export interface Credentials {
  email: string;
  password: string;
  nickname?: string;
}
