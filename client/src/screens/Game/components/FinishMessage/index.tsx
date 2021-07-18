import React from 'react';
import {Typography} from '@material-ui/core';
import Confetti from 'react-confetti';

import {useHooks} from './useHooks';
import styles from './FinishMessage.module.scss';

export interface Props {
  finishTime: string;
  bestRecord?: {time: string; moves: number};
}

export const FinishMessage = (props: Props) => {
  const {getEndGameMessage, isBestRecord, newBestRecordMessage, windowSize} = useHooks(props);

  return (
    <div className={styles.message}>
      <Typography align="center" variant="h5">
        {getEndGameMessage()}
      </Typography>
      {isBestRecord && (
        <>
          <div className={styles.newBestMessage}>
            <Typography align="center" variant="h1">
              {newBestRecordMessage.pre}
            </Typography>
            <Typography align="center" variant="h3">
              {newBestRecordMessage.body}
            </Typography>
          </div>
          <Confetti height={windowSize.height} width={windowSize.width} />
        </>
      )}
    </div>
  );
};
