import {DISC_COLORS} from '../../../utils/constants';
import {useWindowSize} from '../../../utils/hooks/useWindowSize';

export const useGameObjectsStyles = ({pegId, discSize}: {pegId?: string; discSize?: number}) => {
  const {isMobile} = useWindowSize();

  const getContainerStyles = () => ({
    width: !isMobile ? 200 : 150,
    height: !isMobile ? 220 : 150,
  });

  const getPegStyles = () => ({
    backgroundImage: `url(img/${pegId}.png)`,
    width: !isMobile ? 30 : 20,
  });

  const getDiscStyles = () => {
    if (typeof discSize == 'number') {
      return {
        backgroundColor: DISC_COLORS[discSize],
        width: (!isMobile ? 45 : 30) * (discSize + 1),
        height: !isMobile ? 28 : 20,
      };
    }
  };

  return {
    getContainerStyles,
    getPegStyles,
    getDiscStyles,
  };
};
