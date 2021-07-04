import React, {Component} from 'react';
import {connect} from 'react-redux';

import {GameBoard} from '../components/GameBoard';
import {TopBar} from '../components/TopBar';
import {startGame} from '../store/actions/game';
import {Store} from '../store/types/store';
import {SECOND_IN_MILLIS} from '../utils/constants';

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
    }, SECOND_IN_MILLIS);

    this.setState({
      timerInterval: timerInterval,
      gameTimer: 0,
    });
    this.props.startGame();
  };

  /** End game handler */
  handleEndGame = (nullifyTimer?: boolean) => {
    this.clearTimerInterval();
    this.setState({
      timerInterval: null,
      gameTimer: nullifyTimer ? 0 : this.state.gameTimer,
    });
  };

  componentDidUpdate(prevProps: Props) {
    const {isGameEnded} = this.props;
    if (isGameEnded && prevProps.isGameEnded !== isGameEnded) {
      this.handleEndGame();
    }
  }

  render() {
    return (
      <div>
        <TopBar
          gameTimer={this.state.gameTimer}
          startGame={this.handleStartGame}
          endGame={this.handleEndGame}
        />
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
  startGame,
};

export default connect(mapState, mapDispatch)(Game);
