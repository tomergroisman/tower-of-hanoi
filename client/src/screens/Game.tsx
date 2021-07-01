import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeDifficulty} from '../store/actions/game';

import {Difficulty} from '../store/types/game';
import {Store} from '../store/types/store';

interface StateProps {
  difficulty: Difficulty;
}

interface DispatchProps {
  changeDifficulty: (difficulty: Difficulty) => void;
}

type Props = StateProps & DispatchProps;

class Game extends Component<Props> {
  render() {
    const {difficulty, changeDifficulty} = this.props;
    return (
      <div>
        <h1>Tower of Hanoi</h1>
        <p>Difficulty: {difficulty}</p>
        <button onClick={() => changeDifficulty(Difficulty.HARD)}>+</button>
        <button onClick={() => changeDifficulty(Difficulty.MEDIUM)}>-</button>
      </div>
    );
  }
}

const mapState = (state: Store) => {
  return {
    difficulty: state.gameState.difficulty,
  };
};

const mapDispatch: DispatchProps = {
  changeDifficulty,
};

export default connect(mapState, mapDispatch)(Game);
