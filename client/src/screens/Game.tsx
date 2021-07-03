import React, {Component} from 'react';
import {connect} from 'react-redux';

import {GameBoard} from '../components/GameBoard';
import {TopBar} from '../components/TopBar';
import {startGame} from '../store/actions/game';
import {Store} from '../store/types/store';

interface StateProps {
  startTime?: number;
}

interface DispatchProps {
  startGame: () => void;
}

type Props = StateProps & DispatchProps;

class Game extends Component<Props> {
  render() {
    return (
      <div>
        <TopBar />
        {this.props.startTime ? (
          <GameBoard />
        ) : (
          <button onClick={this.props.startGame}>Start Game</button>
        )}
      </div>
    );
  }
}

const mapState = (state: Store) => {
  return {
    startTime: state.gameState.startTime,
  };
};

const mapDispatch: DispatchProps = {
  startGame: startGame,
};

export default connect(mapState, mapDispatch)(Game);
