import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

import styles from './Disc.module.scss';

interface Props {
  index: number;
  isOnTop: boolean;
}

const discColors = ['red', 'green', 'blue', '#cc33ff', '#ff9900'];

export const Disc = (props: Props) => {
  const {index, isOnTop} = props;

  return (
    <Draggable draggableId={`disc-${index}`} index={index} isDragDisabled={!isOnTop}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div
            className={styles.disc}
            style={{backgroundColor: discColors[index], width: 30 * (index + 1)}}
          />
        </div>
      )}
    </Draggable>
  );
};
