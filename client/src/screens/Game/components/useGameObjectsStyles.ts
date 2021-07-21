import React from 'react';

import {DISC_COLORS} from '../../../utils/constants';
import {useWindowSize} from '../../../utils/hooks/useWindowSize';

export const useGameObjectsStyles = ({pegId, discSize}: {pegId?: string; discSize?: number}) => {
  const {isLgCollapse, isMdCollapse, isXsCollapse} = useWindowSize();

  const getBoardContainerStyles = (): React.CSSProperties => ({
    paddingTop: !isXsCollapse ? undefined : 20,
  });

  const getBoardStyles = (): React.CSSProperties => ({
    flexDirection: !isXsCollapse ? 'row' : 'column',
  });

  const getContainerStyles = (): React.CSSProperties => ({
    width: !isLgCollapse ? 250 : !isMdCollapse ? 200 : 150,
    height: !isMdCollapse ? 220 : 150,
    margin: !isXsCollapse ? undefined : '12px 0',
  });

  const getPegStyles = (): React.CSSProperties => ({
    backgroundImage: `url(img/${pegId}.png)`,
    width: !isLgCollapse ? 30 : !isMdCollapse ? 25 : 20,
  });

  const getPegBaseStyles = (): React.CSSProperties => ({
    width: !isLgCollapse ? 225 : !isMdCollapse ? 200 : 140,
  });

  const getDiscStyles = (): React.CSSProperties | undefined => {
    if (typeof discSize == 'number') {
      return {
        backgroundColor: DISC_COLORS[discSize],
        width: (!isLgCollapse ? 45 : !isMdCollapse ? 37 : 30) * (discSize + 1),
        height: !isLgCollapse ? 28 : 20,
      };
    }
  };

  return {
    getBoardContainerStyles,
    getBoardStyles,
    getContainerStyles,
    getPegStyles,
    getPegBaseStyles,
    getDiscStyles,
  };
};
