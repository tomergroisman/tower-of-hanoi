import React from 'react';
import {useTranslation} from 'react-i18next';

import {Difficulty} from '../../../../store/types/game';

import styles from './RecordCard.module.scss';

interface Props {
  level: number;
}

export const EmptyRecordCard = (props: Props) => {
  const {level} = props;
  const {t} = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.difficulty}>{t(`DIFFICULTY_${Difficulty[level]}`)}</p>
      <p>{t('EMPTY_RECORD_CARD_TEXT')}</p>
    </div>
  );
};
