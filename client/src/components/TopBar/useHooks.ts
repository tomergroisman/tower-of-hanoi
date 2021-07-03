import {Props} from '.';

export const useHooks = (props: Props) => {
  const handleDecreaseDifficulty = () => {
    props.decreaseDifficulty();

    if (props.startGame) {
      props.startGame();
      _startGameIfGameIsOn();
    }
  };

  const handleIncreaseDifficulty = () => {
    props.increaseDifficulty();
    _startGameIfGameIsOn();
  };

  const _startGameIfGameIsOn = () => {
    if (props.startGame) {
      props.startGame();
    }
  };

  return {
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
  };
};
