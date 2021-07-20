/* eslint-disable no-empty-pattern */
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

import {LeaderboardRecord} from '../../../../utils/api/interfaces/Leaderboard';

import {RECORDS_PER_PAGE} from '../..';
import styles from './LeaderboardTable.module.scss';

export interface Props {
  records: LeaderboardRecord[];
  onPageChange: ({}: any, page: number) => void;
  nickname: string;
  page: number;
  count: number;
}

export const LeaderboardTable = ({records, onPageChange, nickname, page, count}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const selectedStyles = {
    backgroundColor: '#f2f2f2',
    color: theme.palette.primary.main,
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('LEADERBOARD_TABLE_NICKNAME')}</TableCell>
            <TableCell align="right">{t('LEADERBOARD_TABLE_FINISH_TIME')}</TableCell>
            <TableCell align="right">{t('LEADERBOARD_TABLE_MOVES')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map(record => (
            <TableRow key={`leaderboard-${record.nickname}`}>
              <TableCell
                className={styles.nicknameCell}
                component="th"
                scope="row"
                style={record.nickname === nickname ? selectedStyles : undefined}
              >
                {record.nickname} {record.icon?.icon}
              </TableCell>
              <TableCell
                align="right"
                style={record.nickname === nickname ? selectedStyles : undefined}
              >
                {record.time}
              </TableCell>
              <TableCell
                align="right"
                style={record.nickname === nickname ? selectedStyles : undefined}
              >
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
              count={count}
              rowsPerPage={RECORDS_PER_PAGE}
              page={page}
              onPageChange={onPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
