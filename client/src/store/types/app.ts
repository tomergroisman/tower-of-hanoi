import {Theme} from '@material-ui/core';
import {UserIcon} from '../../components/UserIconSet/interface/UserIcon';

import {Record} from '../../utils/api/interfaces/Record';

export interface AppState {
  user?: User;
  language: Language;
  theme: Theme;
  path: string;
}

export interface User {
  email?: string;
  name?: string;
  nickname?: string;
  icon?: UserIcon;
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
