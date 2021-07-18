import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useWindowSize} from '../../../../utils/hooks/useWindowSize';

import {Props} from '.';

export const useHooks = ({finishTime, bestRecord}: Props) => {
  const {t} = useTranslation();
  const windowSize = useWindowSize();
  const [isBestRecord, setIsBestRecord] = useState(false);
  const didMountRef = useRef(false);

  const getEndGameMessage = () => {
    return t('GAME_FINISH_MESSAGE', {finishTime});
  };

  const newBestRecordMessage = {
    pre: t('NEW_BEST_RECORD_PRE'),
    body: t('NEW_BEST_RECORD_BODY'),
  };

  useEffect(() => {
    if (didMountRef.current) {
      setIsBestRecord(true);
    }
    didMountRef.current = true;
  }, [bestRecord?.time, bestRecord?.moves]);

  return {
    getEndGameMessage,
    isBestRecord,
    newBestRecordMessage,
    windowSize,
  };
};
