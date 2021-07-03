import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

import styles from './Disc.module.scss';

interface Props {
  index: number;
  discs: number;
}

const discColors = ['red', 'green', 'blue', '#cc33ff', '#ff9900'];

export const Disc = (props: Props) => {
  const {index, discs} = props;
  return (
    <Draggable draggableId={`disc-${index}`} index={index} isDragDisabled={index < 2}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div
            className={styles.disc}
            style={{backgroundColor: discColors[index], width: 30 * (discs - index)}}
          />
        </div>
      )}
    </Draggable>
  );
};
