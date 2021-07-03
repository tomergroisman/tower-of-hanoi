import React from 'react';
import {connect} from 'react-redux';

import {increaseDifficulty, decreaseDifficulty, startGame} from '../../store/actions/game';
import {Difficulty} from '../../store/types/game';
import {Store} from '../../store/types/store';
import {capitalizeFirstLetter} from '../../utils/parse';
import {useHooks} from './useHooks';

import styles from './TopBar.module.scss';

interface StateProps {
  difficulty: Difficulty;
  isInGame: boolean;
  increaseDifficulty: () => void;
  decreaseDifficulty: () => void;
  startGame: () => void;
}

export type Props = StateProps;

const TopBarComponent = (props: Props) => {
  const {handleDecreaseDifficulty, handleIncreaseDifficulty} = useHooks(props);

  return (
    <div className={styles.container}>
      <div className="left-side">
        <p className={styles.title}>Tower of Hanoi</p>
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
  isInGame: !!store.gameState.startTime,
});

const mapDispatch = {
  increaseDifficulty: increaseDifficulty,
  decreaseDifficulty: decreaseDifficulty,
  startGame: startGame,
};

export const TopBar = connect(mapState, mapDispatch)(TopBarComponent);
