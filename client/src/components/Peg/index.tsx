import React, {PropsWithChildren} from 'react';
import {Droppable} from 'react-beautiful-dnd';

import styles from './Peg.module.scss';

interface Props {
  backgroundColor: string;
  index: number;
  startPeg: number;
}

export const Peg = (props: PropsWithChildren<Props>) => {
  const {backgroundColor, index} = props;

  return (
    <Droppable droppableId={`peg-${index}`}>
      {provided => (
        <div ref={provided.innerRef} className={styles.container} style={{backgroundColor}}>
          <div className={styles['disc-container']}>
            {provided.placeholder}
            {props.children}
          </div>
        </div>
      )}
    </Droppable>
  );
};
