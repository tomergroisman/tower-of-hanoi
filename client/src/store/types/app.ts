import {Record} from '../../utils/api/interfaces/Record';

export interface AppState {
  user: User;
  language: Language;
}

export interface User {
  email?: string;
  name?: string;
  nickname?: string;
  bestRecords?: (Record | undefined)[];
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
