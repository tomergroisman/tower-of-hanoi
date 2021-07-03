import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

import {Difficulty} from '../../store/types/game';
import {Store} from '../../store/types/store';

import {Peg} from '../Peg';
import {Disc} from '../Disc';
import styles from './GameBoard.module.scss';

interface StateProps {
  difficulty: Difficulty;
  pegs: number;
  discs: number;
  startPeg: number;
}

type Props = StateProps;

// TODO: delete later
const pegColors = ['#99ffff', '#cc99ff', '#ccff99', '#ffff99', '#dfbf9f'];

const GameBoardComponent = (props: Props) => {
  // TODO
  const onDragEnd = (results: DropResult) => {
    console.log(results);
  };

  /** Render the discs to the screen */
  const renderDiscs = useCallback(
    (pegIdx: number) => {
      if (pegIdx === props.startPeg) {
        const discs = [];
        for (var i = props.discs - 1; i >= 0; i--) {
          discs.push(<Disc key={`disc-${i}`} index={i} discs={props.discs} />);
        }
        return discs;
      }
      return null;
    },
    [props.startPeg, props.discs]
  );

  /** Render the pegs to the screen */
  const renderGame = useMemo(() => {
    const pegs = [];
    for (var i = 0; i < props.pegs; i++) {
      pegs.push(
        <Peg key={`peg-${i}`} startPeg={props.startPeg} index={i} backgroundColor={pegColors[i]}>
          {renderDiscs(i)}
        </Peg>
      );
    }
    return pegs;
  }, [props.pegs, props.startPeg, renderDiscs]);

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
});

export const GameBoard = connect(mapState)(GameBoardComponent);
