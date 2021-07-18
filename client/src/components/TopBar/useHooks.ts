import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

import {Props} from '.';

export const useHooks = (props: Props) => {
  const history = useHistory();
  const [, , removeCookie] = useCookies(['token']);

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

  const handleLogout = () => {
    history.push('/login');
    removeCookie('token');
    props.resetApp();
    _resetGame();
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
  };
};
