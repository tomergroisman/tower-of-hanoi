import {Props} from '.';

export const useHooks = (props: Props) => {
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
    if (props.startGame) {
      props.startGame();
    }
  };

  return {
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
    handleTitleClick,
  };
};
