import {History} from 'history';
import {useCookies} from 'react-cookie';

import {Props} from '.';

export const useHooks = (props: Props, history: History) => {
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
    if (props.endGame) {
      props.endGame(true);
      props.resetGame();
    }
    history.push('/');
  };

  const handleLeaderboardClick = () => {
    history.push('/leaderboard');
  };

  const handleLogout = () => {
    removeCookie('token');
    history.push('/login');
  };

  const _startGameIfGameIsOn = () => {
    if (props.isInGame && props.startGame) {
      props.startGame();
    }
  };

  return {
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
    handleTitleClick,
    handleLeaderboardClick,
    handleLogout,
  };
};
