/* eslint-disable no-empty-pattern */
import React, {Component} from 'react';
import {ReactCookieProps, withCookies} from 'react-cookie';
import {withTranslation, WithTranslation} from 'react-i18next';
import {CircularProgress, Container, Typography} from '@material-ui/core';
import {connect} from 'react-redux';

import {TopBar} from '../../components/TopBar';
import {Store} from '../../store/types/store';
import {Difficulty} from '../../store/types/game';
import {DifficultySelector} from './components/DifficultySelector';
import {LeaderboardTable} from './components/LeaderboardTable';
import {fetchLeaderboard} from '../../utils/api/fetch';
import {UserIcon} from '../../components/UserIconSet/interface/UserIcon';
import {Leaderboard as TLeaderboard} from '../../utils/api/interfaces/Leaderboard';

import styles from './Leaderboard.module.scss';

export const RECORDS_PER_PAGE = 20;

interface StateProps {
  nickname: string;
  userIcon?: UserIcon;
}

interface State {
  loading: boolean;
  level: number;
  page: number;
  leaderboard?: TLeaderboard;
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
    const leaderboard = await fetchLeaderboard(
      token,
      level,
      RECORDS_PER_PAGE,
      RECORDS_PER_PAGE * page
    );
    this.setState({leaderboard: leaderboard, loading: false});
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    const isPageChanged = prevState.page !== this.state.page;
    const isLevelChanged = prevState.level !== this.state.level;
    const isIconChanged = prevProps.userIcon !== this.props.userIcon;

    if (isPageChanged || isLevelChanged || isIconChanged) {
      this.fetchLeaderboard();
    }
  }

  render() {
    const {nickname} = this.props;
    const {level, leaderboard} = this.state;

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
  userIcon: store.appState.user.icon,
});

export const Leaderboard = connect(mapState)(withCookies(withTranslation()(LeaderboardScreen)));
