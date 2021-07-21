import React from 'react';
import * as _ from 'lodash';
import {useTranslation} from 'react-i18next';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';

import {Difficulty} from '../../../../store/types/game';

import styles from './DifficultySelector.module.scss';

interface Props {
  level: number;
  center?: boolean;
  onClick?: (level: number) => void;
}

export const DifficultySelector = (props: Props) => {
  const {t} = useTranslation();

  const renderButton = (difficulty: keyof typeof Difficulty) => {
    const {onClick} = props;
    const wrappedOnClick = () => {
      if (onClick) {
        onClick(Difficulty[difficulty] + 1);
      }
    };

    return (
      <ToggleButton
        key={difficulty}
        value={Difficulty[difficulty] + 1}
        onClick={wrappedOnClick}
        className={styles.button}
      >
        {t(`DIFFICULTY_${difficulty}`).toUpperCase()}
      </ToggleButton>
    );
  };

  const renderButtons = () =>
    _.chain(Difficulty)
      .keys()
      .filter(k => typeof Difficulty[k as any] === 'number')
      .map(renderButton)
      .value();

  return (
    <ToggleButtonGroup
      exclusive
      value={props.level}
      className={styles.container}
      size="large"
      style={props.center ? {justifyContent: 'center'} : undefined}
    >
      {renderButtons()}
    </ToggleButtonGroup>
  );
};
