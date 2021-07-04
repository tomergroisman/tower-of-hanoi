import React, {useMemo} from 'react';
import {connect, useDispatch} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';

import {Board, Difficulty} from '../../store/types/game';
import {Store} from '../../store/types/store';

import {Peg} from '../Peg';
import {useHooks} from './useHooks';

import styles from './GameBoard.module.scss';
import {getFinishTime} from '../../utils/parse';

interface StateProps {
  difficulty: Difficulty;
  discs: number;
  startPeg: number;
  board: Board;
  startTime?: number;
  finishTime?: number;
}

export type Props = StateProps;

// TODO: delete later
const pegColors = ['#99ffff', '#cc99ff', '#ccff99', '#ffff99', '#dfbf9f'];

const GameBoardComponent = (props: Props) => {
  const dispatch = useDispatch();
  const {onDragEnd} = useHooks(props, dispatch);

  /** Render the pegs to the screen */
  const renderGame = useMemo(
    () =>
      Object.keys(props.board).map((key, idx) => (
        <Peg key={key} id={key} startPeg={props.startPeg} backgroundColor={pegColors[idx]}>
          {props.board[key]}
        </Peg>
      )),
    [props.board, props.startPeg]
  );

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEnd}>{renderGame}</DragDropContext>
      {props.finishTime && props.startTime && (
        <p>Game is finished in {getFinishTime(props.finishTime, props.startTime)}</p>
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
});

export const GameBoard = connect(mapState)(GameBoardComponent);
