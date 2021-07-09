export interface User {
  email?: string;
  name?: string;
  nickname?: string;
}

export interface UserState {
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
  nickname?: string;
}
