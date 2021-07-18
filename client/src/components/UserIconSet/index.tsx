import React from 'react';
import {Grid, Popover} from '@material-ui/core';

import {iconList} from './iconList';
import {useIconList} from '../TopBar/useIconList';
import {UserIcon} from './interface/UserIcon';

import styles from './UserIconSet.module.scss';

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onSelectIcon: (icon: UserIcon) => void;
}

export default function UserIconSet({anchorEl, open, onSelectIcon}: Props) {
  const {open: openSelf, openIconList, closeIconList} = useIconList();

  const renderSet = () => (
    <Grid container>
      {iconList.map(icon => {
        const onSelectIconWrapped = () => {
          onSelectIcon(icon);
          closeIconList();
        };

        return (
          <Grid key={icon.name} item xs={3} className={styles.icon} onClick={onSelectIconWrapped}>
            {icon.icon}
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Popover
      className={styles.popover}
      classes={{
        paper: styles.popoverContent,
      }}
      open={!!open || !!openSelf}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{onMouseEnter: openIconList, onMouseLeave: closeIconList}}
      disableRestoreFocus
    >
      {renderSet()}
    </Popover>
  );
}
