import {History} from 'history';
import {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useTranslation} from 'react-i18next';

import {Props} from '.';

export const useHooks = (props: Props, history: History) => {
  const {i18n} = useTranslation();
  const [, , removeCookie] = useCookies(['token']);

  const handleDecreaseDifficulty = () => {
    props.decreaseDifficulty();
    _startGameIfGameIsOn();
  };

  const handleIncreaseDifficulty = () => {
    props.increaseDifficulty();
    _startGameIfGameIsOn();
  };

  const handleSetToEn = () => {
    props.setLanguage('en');
  };

  const handleSetToHe = () => {
    props.setLanguage('he');
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

  useEffect(() => {
    i18n.changeLanguage(props.language);
  }, [props.language, i18n]);

  return {
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
    handleSetToEn,
    handleSetToHe,
    handleTitleClick,
    handleLeaderboardClick,
    handleLogout,
  };
};
