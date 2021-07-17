import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ReactCookieProps, withCookies} from 'react-cookie';
import {withTranslation, WithTranslation} from 'react-i18next';
import {Button, Container, Grid, Typography} from '@material-ui/core';

import {GameBoard} from './components/GameBoard';
import {TopBar} from '../../components/TopBar';
import {startGame} from '../../store/actions/game';
import {setBestRecords} from '../../store/actions/app';
import {Store} from '../../store/types/store';
import {SECOND_IN_MILLIS} from '../../utils/constants';
import {apiRequests} from '../../utils/api/requests';
import {Record} from '../../utils/api/interfaces/Record';
import {fetchBestRecords} from '../../utils/api/fetch';
import {timerToString} from '../../utils/parse';
import {RecordCard} from './components/RecordCard';

import styles from './Game.module.scss';

interface StateProps {
  startTime?: number;
  finishTime?: number;
  level: number;
  moves: number;
  bestRecords?: (Record | undefined)[];
}

interface DispatchProps {
  startGame: () => void;
  setBestRecords: (bestRecords: (Record | undefined)[]) => void;
}

interface State {
  gameTimer: number;
  timerInterval: NodeJS.Timeout | null;
}

export type Props = StateProps & DispatchProps & WithTranslation & ReactCookieProps;

class GameScreen extends Component<Props, State> {
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

  /** Submit the game record to the server */
  submitRecord = async () => {
    const {startTime, finishTime, setBestRecords, allCookies: cookies} = this.props;
    if (startTime && finishTime) {
      const record: Record = {
        level: this.props.level,
        moves: this.props.moves,
        time: timerToString(this.state.gameTimer),
      };
      apiRequests.postRecord(cookies?.token, record);
      const bestRecords = await fetchBestRecords(cookies?.token);
      setBestRecords(bestRecords);
    }
  };

  /** Extract key for record card */
  extractRecordKey = (i: number, record?: Record) => {
    return record ? `${record.level}-${record.moves}-${record.time}` : `empty_record-${i + 1}`;
  };

  /** Render the lobby layout */
  renderLobby = () => {
    const {t, bestRecords} = this.props;
    return (
      <div className={styles.lobbyContainer}>
        <Typography variant="h3" className={styles.bestRecordsTitle}>
          {t('BEST_RECORDS_TITLE')}
        </Typography>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          {bestRecords?.map((record, i) => (
            <RecordCard key={this.extractRecordKey(i, record)} record={record} level={i} />
          ))}
        </Grid>
        <div className={styles.ctaContainer}>
          <Button variant="contained" color="primary" onClick={this.handleStartGame}>
            {t('START_GAME_BUTTON')}
          </Button>
        </div>
      </div>
    );
  };

  componentDidUpdate(prevProps: Props) {
    const isGameEnded = !!this.props.finishTime;
    if (isGameEnded && !!prevProps.finishTime !== isGameEnded) {
      this.handleEndGame();
      this.submitRecord();
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
        <Container maxWidth="lg">
          {this.props.startTime ? <GameBoard /> : this.renderLobby()}
        </Container>
      </div>
    );
  }
}

const mapState = (store: Store) => ({
  startTime: store.gameState.startTime,
  finishTime: store.gameState.finishTime,
  level: store.gameState.difficulty + 1,
  moves: store.gameState.moves,
  bestRecords: store.appState.user.bestRecords,
});

const mapDispatch: DispatchProps = {
  startGame,
  setBestRecords,
};

export const Game = connect(mapState, mapDispatch)(withCookies(withTranslation()(GameScreen)));
