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

import {TopBar} from '../../components/TopBar';
import {Store} from '../../store/types/store';
import {LeaderboardRecord} from '../../utils/api/interfaces/Record';
import {apiRequests} from '../../utils/api/requests';
import {ApiResponse} from '../../utils/api/interfaces/Response';

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
      page: 1,
    };
  }

  /** Fetch leaderboard records from server */
  fetchLeaderboard = async () => {
    const {level, page} = this.state;
    const token = this.props.allCookies?.token;
    const leaderboard = await apiRequests.getLeaderboard(token, level, page);
    this.setState({leaderboard});
  };

  handlePageChange = () => {
    this.setState({page: this.state.page + 1});
  };

  componentDidMount() {
    this.fetchLeaderboard();
  }

  // eslint-disable-next-line no-empty-pattern
  componentDidUpdate({}, prevState: State) {
    if (prevState.page !== this.state.page) {
      this.fetchLeaderboard();
    }
  }

  render() {
    const {leaderboard, page} = this.state;

    return (
      <div>
        <TopBar gameTimer={0} />
        {leaderboard && (
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
                    page={page - 1}
                    SelectProps={{
                      inputProps: {'aria-label': 'rows per page'},
                      native: true,
                    }}
                    onPageChange={this.handlePageChange}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </div>
    );
  }
}

const mapState = (store: Store) => ({
  nickname: store.appState.user.nickname,
});

export const Leaderboard = connect(mapState)(withCookies(withTranslation()(LeaderboardScreen)));
