import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

import {useWindowSize} from '../../../../utils/hooks/useWindowSize';
import {resetGame} from '../../../../store/actions/game';

import {Props} from '.';

export const useHooks = ({finishTime, bestRecord}: Props) => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const [isBestRecord, setIsBestRecord] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const didMountRef = useRef(false);

  const handleBackClick = () => {
    dispatch(resetGame());
  };

  useEffect(() => {
    if (didMountRef.current) {
      setIsBestRecord(true);
    } else {
      didMountRef.current = true;
      setTimeout(() => {
        setShowCTA(true);
      }, 1000);
    }
  }, [bestRecord?.time, bestRecord?.moves]);

  return {
    isBestRecord,
    handleBackClick,
    showCTA,
    windowSize,
  };
};
