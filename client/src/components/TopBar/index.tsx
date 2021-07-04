import React from 'react';
import {connect} from 'react-redux';

import {increaseDifficulty, decreaseDifficulty, resetGame} from '../../store/actions/game';
import {Difficulty} from '../../store/types/game';
import {Store} from '../../store/types/store';
import {capitalizeFirstLetter, timerToString} from '../../utils/parse';
import {useHooks} from './useHooks';

import styles from './TopBar.module.scss';

interface StateProps {
  difficulty: Difficulty;
}

interface DispatchProps {
  increaseDifficulty: () => void;
  decreaseDifficulty: () => void;
  resetGame: () => void;
}

interface OwnProps {
  gameTimer: number;
  startGame: () => void;
  endGame: (nullifyTimer?: boolean) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;

const TopBarComponent = (props: Props) => {
  const {handleDecreaseDifficulty, handleIncreaseDifficulty, handleTitleClick} = useHooks(props);

  return (
    <div className={styles.container}>
      <div className="left-side">
        <p className={styles.title} onClick={handleTitleClick}>
          Tower of Hanoi
        </p>
      </div>
      <div>
        <p>{timerToString(props.gameTimer)}</p>
      </div>
      <div className="right-side">
        <p>Difficulty: {capitalizeFirstLetter(Difficulty[props.difficulty])}</p>
        <button onClick={handleIncreaseDifficulty}>+</button>
        <button onClick={handleDecreaseDifficulty}>-</button>
      </div>
    </div>
  );
};

const mapState = (store: Store) => ({
  difficulty: store.gameState.difficulty,
});

const mapDispatch = {
  increaseDifficulty,
  decreaseDifficulty,
  resetGame,
};

export const TopBar = connect(mapState, mapDispatch)(TopBarComponent);
