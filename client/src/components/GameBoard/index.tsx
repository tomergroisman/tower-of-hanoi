import React, {useMemo} from 'react';
import {connect, useDispatch} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';

import {Board, Difficulty} from '../../store/types/game';
import {Store} from '../../store/types/store';

import {Peg} from '../Peg';
import {useHooks} from './useHooks';

import styles from './GameBoard.module.scss';

interface StateProps {
  difficulty: Difficulty;
  pegs: number;
  discs: number;
  startPeg: number;
  board: Board;
}

type Props = StateProps;

// TODO: delete later
const pegColors = ['#99ffff', '#cc99ff', '#ccff99', '#ffff99', '#dfbf9f'];

const GameBoardComponent = (props: Props) => {
  const dispatch = useDispatch();
  const {onDragEnd} = useHooks(dispatch);

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
    </div>
  );
};

const mapState = (state: Store) => ({
  difficulty: state.gameState.difficulty,
  pegs: state.gameState.pegs,
  discs: state.gameState.discs,
  startPeg: state.gameState.startPeg,
  board: state.gameState.board,
});

export const GameBoard = connect(mapState)(GameBoardComponent);
