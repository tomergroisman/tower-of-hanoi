import {DropResult} from 'react-beautiful-dnd';
import {Dispatch} from 'redux';

import {moveDisc} from '../../store/actions/game';

export const useHooks = (dispatch: Dispatch) => {
  const onDragEnd = ({source, destination}: DropResult) => {
    if (destination) {
      dispatch(moveDisc(source.droppableId, destination.droppableId));
    }
  };

  return {
    onDragEnd,
  };
};
