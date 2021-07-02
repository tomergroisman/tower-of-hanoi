import React from 'react';
import {connect} from 'react-redux';

import {Difficulty} from '../../store/types/game';
import {Store} from '../../store/types/store';

interface StateProps {
  difficulty: Difficulty;
  startPeg: number;
}

type Props = StateProps;

const GameBoardComponent = (props: Props) => {
  return (
    <div>
      <h1>Tower of Hanoi</h1>
      <p>Difficulty: {Difficulty[props.difficulty]}</p>
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  difficulty: state.gameState.difficulty,
  startPeg: state.gameState.startPeg,
});

export const GameBoard = connect(mapStateToProps)(GameBoardComponent);
