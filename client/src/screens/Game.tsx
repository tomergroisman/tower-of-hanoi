import React, {Component} from 'react';
import {connect} from 'react-redux';

import {GameBoard} from '../components/GameBoard';
import {TopBar} from '../components/TopBar';
import {startGame} from '../store/actions/game';
import {Store} from '../store/types/store';

interface StateProps {
  startTime?: number;
  isGameEnded?: boolean;
}

interface DispatchProps {
  startGame: () => void;
}

interface State {
  gameTimer: number;
  timerInterval: NodeJS.Timeout | null;
}

export type Props = StateProps & DispatchProps;

class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      gameTimer: 0,
      timerInterval: null,
    };
  }

  /** Clear the game timer interval, if defined */
  clearTimerInterval() {
    if (this.state.timerInterval) {
      clearInterval(this.state.timerInterval);
    }
  }

  /** Start game handler */
  handleStartGame = () => {
    this.clearTimerInterval();
    const timerInterval = setInterval(() => {
      this.setState({
        gameTimer: this.state.gameTimer + 1,
      });
    }, 1000);

    this.setState({
      timerInterval: timerInterval,
      gameTimer: 0,
    });
    this.props.startGame();
  };

  /** End game handler */
  handleEndGame = () => {
    this.clearTimerInterval();
    this.setState({
      timerInterval: null,
    });
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isGameEnded !== this.props.isGameEnded) {
      this.handleEndGame();
    }
  }

  render() {
    return (
      <div>
        <TopBar gameTimer={this.state.gameTimer} startGame={this.handleStartGame} />
        {this.props.startTime ? (
          <GameBoard />
        ) : (
          <button onClick={this.handleStartGame}>Start Game</button>
        )}
      </div>
    );
  }
}

const mapState = (store: Store) => ({
  startTime: store.gameState.startTime,
  isGameEnded: !!store.gameState.finishTime,
});

const mapDispatch: DispatchProps = {
  startGame: startGame,
};

export default connect(mapState, mapDispatch)(Game);
