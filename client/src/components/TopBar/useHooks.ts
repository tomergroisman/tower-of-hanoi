import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

import {Props} from '.';
import {useWindowSize} from '../../utils/hooks/useWindowSize';

export const useHooks = (props: Props) => {
  const history = useHistory();
  const [, , removeCookie] = useCookies(['token']);
  const {isXsCollapse, isLgCollapse} = useWindowSize();

  const handleDecreaseDifficulty = () => {
    props.decreaseDifficulty();
    _startGameIfGameIsOn();
  };

  const handleIncreaseDifficulty = () => {
    props.increaseDifficulty();
    _startGameIfGameIsOn();
  };

  const handleTitleClick = () => {
    _resetGame();
    history.push('/');
  };

  const handleLeaderboardClick = () => {
    history.push('/leaderboard');
    _resetGame();
  };

  const handleLogout = async () => {
    _resetGame();
    props.resetApp();
    history.push('/login');
    removeCookie('token');
  };

  const getContainerStyles = (): React.CSSProperties | undefined => {
    if (isLgCollapse) {
      return {
        paddingLeft: 20,
        paddingRight: 20,
      };
    }
  };

  const getUserSectionStyles = (): React.CSSProperties | undefined => {
    if (isXsCollapse) {
      return {
        position: 'fixed',
        bottom: 12,
        right: 12,
        color: '#595959',
        padding: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 10,
      };
    }
  };

  const _startGameIfGameIsOn = () => {
    if (props.isInGame && props.startGame) {
      props.startGame();
    }
  };

  const _resetGame = () => {
    if (props.endGame) {
      props.endGame(true);
    }
    props.resetGame();
  };

  return {
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
    handleTitleClick,
    handleLeaderboardClick,
    handleLogout,
    getContainerStyles,
    getUserSectionStyles,
  };
};
