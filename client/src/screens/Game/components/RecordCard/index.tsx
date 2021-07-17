import React from 'react';
import {useTranslation} from 'react-i18next';
import {Card, Grid, Typography} from '@material-ui/core';

import {Difficulty} from '../../../../store/types/game';
import {Record} from '../../../../utils/api/interfaces/Record';

import styles from './RecordCard.module.scss';
import {parseDate} from '../../../../utils/parse';
import {Icon} from '../../../../components/Icon';
import {Assets} from '../../../../utils/assets';

interface Props {
  record?: Record;
  level: number;
}

export const RecordCard = (props: Props) => {
  const {record, level} = props;
  const {t} = useTranslation();

  return (
    <Grid item className={styles.wrapper} sm={4} xs={12}>
      <Card variant="outlined" className={styles.container}>
        <Typography variant="h5" className={styles.difficulty}>
          {t(`DIFFICULTY_${Difficulty[level]}`)}
        </Typography>
        {record ? (
          <div className={styles.record}>
            <p>
              <Icon spacing={3} asset={Assets.icons.moves} /> {record.moves}
            </p>
            <p>
              <Icon spacing={3} asset={Assets.icons.finish} /> {record.time}
            </p>
            <p>
              {record.date && (
                <>
                  <Icon spacing={3} asset={Assets.icons.date} /> {parseDate(record.date)}
                </>
              )}
            </p>
          </div>
        ) : (
          <div className={styles.center}>
            <Icon asset={Assets.icons.null} />
            <p>{t('EMPTY_RECORD_CARD_TEXT')}</p>
          </div>
        )}
      </Card>
    </Grid>
  );
};
