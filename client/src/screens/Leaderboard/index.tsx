/* eslint-disable no-empty-pattern */
import React, {Component} from 'react';
import {ReactCookieProps, withCookies} from 'react-cookie';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Paper,
} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';

import {TopBar} from '../../components/TopBar';
import {Store} from '../../store/types/store';
import {LeaderboardRecord} from '../../utils/api/interfaces/Record';
import {apiRequests} from '../../utils/api/requests';
import {ApiResponse} from '../../utils/api/interfaces/Response';
import {NUM_DIFFICULTIES} from '../../utils/constants';
import {Difficulty} from '../../store/types/game';

const RECORDS_PER_PAGE = 20;

interface StateProps {
  nickname?: string;
}

interface State {
  level: number;
  page: number;
  leaderboard?: ApiResponse<LeaderboardRecord[]>;
}

type Props = StateProps & WithTranslation & ReactCookieProps;

class LeaderboardScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      level: 1,
      page: 0,
    };
  }

  /** Fetch leaderboard records from server */
  fetchLeaderboard = async () => {
    const {level, page} = this.state;
    const token = this.props.allCookies?.token;
    const leaderboard = await apiRequests.getLeaderboard(token, level, RECORDS_PER_PAGE, page);
    this.setState({leaderboard});
  };

  /** Page change handler */
  handlePageChange = ({}: any, page: number) => {
    this.setState({page});
  };

  /** Level change handler */
  handleLevelChange = ({}: any, level: number) => {
    this.setState({level: level, page: 0});
  };

  /** Renders an empty leaderboard */
  renderEmptyState = () => {
    const {t} = this.props;
    const {level} = this.state;

    return (
      <div>
        <p>{t('LEADERBOARD_EMPTY_STATE', {level: Difficulty[level - 1].toLocaleLowerCase()})}</p>
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
    const {leaderboard, level, page} = this.state;

    return (
      <div>
        <TopBar gameTimer={0} />
        <Pagination count={NUM_DIFFICULTIES} page={level} onChange={this.handleLevelChange} />
        {!!leaderboard?.results.length ? (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {leaderboard?.results.map(record => (
                  <TableRow key={`leaderboard-${record.nickname}`}>
                    <TableCell component="th" scope="row">
                      {record.nickname}
                    </TableCell>
                    <TableCell style={{width: 160}} align="right">
                      {record.time}
                    </TableCell>
                    <TableCell style={{width: 160}} align="right">
                      {record.moves}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[20]}
                    colSpan={3}
                    count={leaderboard?.count}
                    rowsPerPage={RECORDS_PER_PAGE}
                    page={page}
                    onPageChange={this.handlePageChange}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ) : (
          this.renderEmptyState()
        )}
      </div>
    );
  }
}

const mapState = (store: Store) => ({
  nickname: store.appState.user.nickname,
});

export const Leaderboard = connect(mapState)(withCookies(withTranslation()(LeaderboardScreen)));
