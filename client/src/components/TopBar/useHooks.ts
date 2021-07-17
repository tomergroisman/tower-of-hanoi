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
    _resetGameIfGameIsOver();
    history.push('/');
  };

  const handleLeaderboardClick = () => {
    _resetGameIfGameIsOver();
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

  const _resetGameIfGameIsOver = () => {
    if (props.endGame) {
      props.endGame(true);
      props.resetGame();
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
