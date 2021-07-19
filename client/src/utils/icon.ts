import {iconList} from '../components/UserIconSet/iconList';

export const getIconFromName = (iconName?: string | null) => {
  return iconList.find(icon => icon.name === iconName);
};
