import {useMemo} from 'react';

import {Props} from '.';

export const useHooks = (props: Props) => {
  const userTitle = useMemo(() => {
    const {email, nickname} = props.user;
    return nickname ?? email ?? '';
  }, [props.user]);

  const handleDecreaseDifficulty = () => {
    props.decreaseDifficulty();
    _startGameIfGameIsOn();
  };

  const handleIncreaseDifficulty = () => {
    props.increaseDifficulty();
    _startGameIfGameIsOn();
  };

  const handleTitleClick = () => {
    props.endGame(true);
    props.resetGame();
  };

  const _startGameIfGameIsOn = () => {
    if (props.isInGame) {
      props.startGame();
    }
  };

  return {
    userTitle,
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
    handleTitleClick,
  };
};
