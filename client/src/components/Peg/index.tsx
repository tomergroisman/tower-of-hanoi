import React, {PropsWithChildren} from 'react';
import {Droppable} from 'react-beautiful-dnd';

import styles from './Peg.module.scss';

interface Props {
  id: string;
  backgroundColor: string;
  startPeg: number;
}

export const Peg = (props: PropsWithChildren<Props>) => {
  const {id, backgroundColor} = props;

  return (
    <Droppable droppableId={id}>
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
