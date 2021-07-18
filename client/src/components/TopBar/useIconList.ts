import {useRef, useState} from 'react';
import {useCookies} from 'react-cookie';
import {useDispatch} from 'react-redux';

import {setIcon} from '../../store/actions/app';
import {apiRequests} from '../../utils/api/requests';
import {UserIcon} from '../UserIconSet/interface/UserIcon';

export const useIconList = () => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const anchorEl = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const openIconList = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    anchorEl.current = event.currentTarget;
    setOpen(true);
  };

  const closeIconList = () => {
    setOpen(false);
  };

  const onSelectIcon = (icon: UserIcon) => {
    dispatch(setIcon(icon));
    apiRequests.updateUser(cookies.token, {icon: icon.name});
  };

  return {
    anchorEl,
    open,
    openIconList,
    closeIconList,
    onSelectIcon,
  };
};
