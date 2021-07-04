import {useEffect} from 'react';
import {DropResult} from 'react-beautiful-dnd';
import {Dispatch} from 'redux';

import {endGame, moveDisc} from '../../store/actions/game';
import {PEGS} from '../../utils/constants';
import {Props} from '.';

export const useHooks = (props: Props, dispatch: Dispatch) => {
  const onDragEnd = ({source, destination}: DropResult) => {
    if (destination) {
      dispatch(moveDisc(source.droppableId, destination.droppableId, props.board));
    }
  };

  useEffect(() => {
    for (const key of Object.keys(props.board)) {
      if (key !== `peg-${props.startPeg}` && props.board[key].length === PEGS) {
        dispatch(endGame());
      }
    }
  }, [props.board, props.startPeg, dispatch]);

  return {
    onDragEnd,
  };
};
