/* eslint-disable no-empty-pattern */
import React, {Component} from 'react';
import {ReactCookieProps, withCookies} from 'react-cookie';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {CircularProgress, Container, Typography} from '@material-ui/core';

import {TopBar} from '../../components/TopBar';
import {Store} from '../../store/types/store';
import {LeaderboardRecord} from '../../utils/api/interfaces/Record';
import {apiRequests} from '../../utils/api/requests';
import {ApiResponse} from '../../utils/api/interfaces/Response';
import {Difficulty} from '../../store/types/game';
import {DifficultySelector} from './components/DifficultySelector';
import {LeaderboardTable} from './components/LeaderboardTable';

import styles from './Leaderboard.module.scss';
import {getIconFromName} from '../../utils/icon';

export const RECORDS_PER_PAGE = 20;

interface StateProps {
  nickname: string;
}

interface State {
  loading: boolean;
  level: number;
  page: number;
  leaderboard?: ApiResponse<LeaderboardRecord[]>;
}

type Props = StateProps & WithTranslation & ReactCookieProps;

class LeaderboardScreen extends Component<Props, State> {
  state: State = {
    loading: true,
    level: 1,
    page: 0,
  };

  /** Fetch leaderboard records from server */
  fetchLeaderboard = async () => {
    this.setState({loading: true});
    const {level, page} = this.state;
    const token = this.props.allCookies?.token;
    const fetchedLeaderboard = await apiRequests.getLeaderboard(
      token,
      level,
      RECORDS_PER_PAGE,
      RECORDS_PER_PAGE * page
    );
    const leaderboard: ApiResponse<LeaderboardRecord[]> = {
      ...fetchedLeaderboard,
      results: fetchedLeaderboard.results.map(record => ({
        ...record,
        icon: getIconFromName(record.icon),
      })),
    };
    console.log(leaderboard);
    this.setState({leaderboard, loading: false});
  };

  /** Page change handler */
  handlePageChange = ({}: any, page: number) => {
    this.setState({page});
  };

  /** Level change handler */
  handleLevelChange = (difficulty: Difficulty) => {
    this.setState({level: difficulty, page: 0});
  };

  /** Renders an empty leaderboard */
  renderEmptyState = () => {
    const {t} = this.props;
    const {level} = this.state;

    return (
      <div>
        <Typography align="center" variant="h5">
          {t('LEADERBOARD_EMPTY_STATE', {
            level: t(`DIFFICULTY_${Difficulty[level - 1]}`).toLocaleLowerCase(),
          })}
        </Typography>
      </div>
    );
  };

  componentDidMount() {
    this.fetchLeaderboard();
  }

  componentDidUpdate({}, prevState: State) {
    const isPageChanged = prevState.page !== this.state.page;
    const isLevelChanged = prevState.level !== this.state.level;

    if (isPageChanged || isLevelChanged) {
      this.fetchLeaderboard();
    }
  }

  render() {
    const {nickname} = this.props;
    const {leaderboard, level} = this.state;

    return (
      <div>
        <TopBar gameTimer={0} />
        <Container maxWidth="md" className={styles.leaderboard}>
          <DifficultySelector level={level} center onClick={this.handleLevelChange} />
          <div className={styles.content}>
            {this.state.loading ? (
              <CircularProgress />
            ) : !!leaderboard?.results.length ? (
              <LeaderboardTable
                records={leaderboard.results}
                count={leaderboard.count}
                nickname={nickname}
                onPageChange={this.handlePageChange}
                page={this.state.page}
              />
            ) : (
              this.renderEmptyState()
            )}
          </div>
        </Container>
      </div>
    );
  }
}

const mapState = (store: Store) => ({
  nickname: store.appState.user.nickname ?? '',
});

export const Leaderboard = connect(mapState)(withCookies(withTranslation()(LeaderboardScreen)));
