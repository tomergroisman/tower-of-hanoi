import {User} from '../../../store/types/app';

export interface UserApi extends Omit<User, 'icon'> {
  icon: string;
}
