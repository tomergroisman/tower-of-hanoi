import {DISC_COLORS} from '../../../utils/constants';
import {useWindowSize} from '../../../utils/hooks/useWindowSize';

export const useGameObjectsStyles = ({pegId, discSize}: {pegId?: string; discSize?: number}) => {
  const {isSmCollapse} = useWindowSize();

  const getContainerStyles = () => ({
    width: !isSmCollapse ? 200 : 150,
    height: !isSmCollapse ? 220 : 150,
  });

  const getPegStyles = () => ({
    backgroundImage: `url(img/${pegId}.png)`,
    width: !isSmCollapse ? 30 : 20,
  });

  const getDiscStyles = () => {
    if (typeof discSize == 'number') {
      return {
        backgroundColor: DISC_COLORS[discSize],
        width: (!isSmCollapse ? 45 : 30) * (discSize + 1),
        height: !isSmCollapse ? 28 : 20,
      };
    }
  };

  return {
    getContainerStyles,
    getPegStyles,
    getDiscStyles,
  };
};
