import React from 'react';
import {connect} from 'react-redux';

import {increaseDifficulty, decreaseDifficulty} from '../../store/actions/game';
import {Difficulty} from '../../store/types/game';
import {Store} from '../../store/types/store';
import {capitalizeFirstLetter} from '../../utils/parse';
import './TopBar.scss';

interface StateProps {
  difficulty: Difficulty;
  increaseDifficulty: () => void;
  decreaseDifficulty: () => void;
}

type Props = StateProps;

const TopBarComponent = (props: Props) => {
  return (
    <div className="container">
      <div className="left-side">
        <p className="title">Tower of Hanoi</p>
      </div>
      <div className="right-side">
        <p>Difficulty: {capitalizeFirstLetter(Difficulty[props.difficulty])}</p>
        <button onClick={props.increaseDifficulty}>+</button>
        <button onClick={props.decreaseDifficulty}>-</button>
      </div>
    </div>
  );
};

const mapState = (state: Store) => ({
  difficulty: state.gameState.difficulty,
  startPeg: state.gameState.startPeg,
});

const mapDispatch = {
  increaseDifficulty,
  decreaseDifficulty,
};

export const TopBar = connect(mapState, mapDispatch)(TopBarComponent);
