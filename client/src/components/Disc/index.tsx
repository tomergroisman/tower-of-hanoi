import React from 'react';
import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';

import styles from './Disc.module.scss';

interface Props {
  size: number;
  index: number;
  isOnTop: boolean;
}

const discColors = ['red', 'green', 'blue', '#cc33ff', '#ff9900'];

export const Disc = (props: Props) => {
  const {size, index, isOnTop} = props;

  /** Disable dnd drop animation */
  const getStyle = (
    style?: DraggingStyle | NotDraggingStyle,
    snapshot?: DraggableStateSnapshot
  ) => {
    if (!snapshot?.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `0.001s`,
    };
  };

  return (
    <Draggable draggableId={`disc-${size}`} index={index} isDragDisabled={!isOnTop}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          <div
            className={styles.disc}
            style={{backgroundColor: discColors[size], width: 30 * (size + 1)}}
          />
        </div>
      )}
    </Draggable>
  );
};
