import React from 'react';
import {useTranslation} from 'react-i18next';

import {Difficulty} from '../../../../store/types/game';
import {Record} from '../../../../utils/api/interfaces/Record';

import styles from './RecordCard.module.scss';

interface Props {
  record: Record;
  level: number;
}

export const RecordCard = (props: Props) => {
  const {record, level} = props;
  const {t} = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.difficulty}>{t(`DIFFICULTY_${Difficulty[level]}`)}</p>
      <p>{record.moves}</p>
      <p>{record.time}</p>
    </div>
  );
};
