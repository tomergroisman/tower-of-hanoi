import React, {useMemo} from 'react';
import {connect, useDispatch} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';

import {Board, Difficulty} from '../../../../store/types/game';
import {Store} from '../../../../store/types/store';
import {Peg} from '../Peg';
import {FinishMessage} from '../FinishMessage';
import {Record} from '../../../../utils/api/interfaces/Record';
import {useGameObjectsStyles} from '../useGameObjectsStyles';

import {useHooks} from './useHooks';
import styles from './GameBoard.module.scss';

interface StateProps {
  difficulty: Difficulty;
  discs: number;
  startPeg: number;
  board: Board;
  startTime?: number;
  finishTime?: number;
  bestRecords?: (Record | undefined)[];
}

export type Props = StateProps;

const GameBoardComponent = (props: Props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {onDragEnd, getFinishTime, getBestRecord} = useHooks(props, t, dispatch);
  const {getBoardContainerStyles, getBoardStyles} = useGameObjectsStyles({});

  const renderGame = useMemo(
    () => (
      <div className={styles.gameBoard} style={getBoardStyles()}>
        {Object.keys(props.board).map((key, idx) => (
          <Peg key={key} id={key} startPeg={props.startPeg}>
            {props.board[key]}
          </Peg>
        ))}
      </div>
    ),
    [props.board, props.startPeg, getBoardStyles]
  );

  return (
    <div className={styles.container} style={getBoardContainerStyles()}>
      <DragDropContext onDragEnd={onDragEnd}>{renderGame}</DragDropContext>
      {props.finishTime && props.startTime && (
        <FinishMessage finishTime={getFinishTime()} bestRecord={getBestRecord()} />
      )}
    </div>
  );
};

const mapState = (store: Store) => ({
  difficulty: store.gameState.difficulty,
  discs: store.gameState.discs,
  startPeg: store.gameState.startPeg,
  board: store.gameState.board,
  startTime: store.gameState.startTime,
  finishTime: store.gameState.finishTime,
  bestRecords: store.appState.user?.bestRecords,
});

export const GameBoard = connect(mapState)(GameBoardComponent);
