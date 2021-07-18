import React from 'react';
import {Button, Slide, Typography, Zoom} from '@material-ui/core';
import Confetti from 'react-confetti';

import {useHooks} from './useHooks';
import styles from './FinishMessage.module.scss';
import {useTranslation} from 'react-i18next';

export interface Props {
  finishTime: string;
  bestRecord?: {time: string; moves: number};
}

export const FinishMessage = (props: Props) => {
  const {t} = useTranslation();
  const {isBestRecord, handleBackClick, showCTA, windowSize} = useHooks(props);

  return (
    <div className={styles.message}>
      <Typography align="center" variant="h5">
        {t('GAME_FINISH_MESSAGE', {finishTime: props.finishTime})}
      </Typography>
      {isBestRecord && (
        <Zoom in={isBestRecord}>
          <div className={styles.newBestMessage}>
            <Typography align="center" variant="h1">
              {t('NEW_BEST_RECORD_PRE')}
            </Typography>
            <Typography align="center" variant="h3">
              {t('NEW_BEST_RECORD_BODY')}
            </Typography>
          </div>
        </Zoom>
      )}
      {isBestRecord && <Confetti height={windowSize.height} width={windowSize.width} />}
      <Slide in={showCTA} direction="up" timeout={500}>
        <div className={styles.ctaContainer}>
          <Button onClick={handleBackClick} variant="outlined" color="primary" size="large">
            <Typography variant="h6">{t('GAME_FINISH_BACK')}</Typography>
          </Button>
        </div>
      </Slide>
    </div>
  );
};
