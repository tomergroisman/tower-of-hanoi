import React, {useMemo} from 'react';
import {connect} from 'react-redux';

import {Difficulty} from '../../store/types/game';
import {Store} from '../../store/types/store';

import {Peg} from '../Peg';
import {Disc} from '../Disc';

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
  /** Render the pegs to the screen */
  const renderPegs = useMemo(() => {
    const pegs = [];
    for (var i = 0; i < props.pegs; i++) {
      pegs.push(<Peg key={`peg-${i}`} backgroundColor={pegColors[i]} />);
    }
    return pegs;
  }, [props.pegs]);

  /** Render the discs to the screen */
  const renderDiscs = useMemo(() => {
    const discs = [];
    for (var i = 0; i < props.pegs; i++) {
      discs.push(<Disc key={`disc-${i}`} index={i} />);
    }
    return discs;
  }, [props.pegs]);

  return (
    <div>
      {renderPegs}
      {renderDiscs}
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  difficulty: state.gameState.difficulty,
  pegs: state.gameState.pegs,
  discs: state.gameState.discs,
  startPeg: state.gameState.startPeg,
});

export const GameBoard = connect(mapStateToProps)(GameBoardComponent);
