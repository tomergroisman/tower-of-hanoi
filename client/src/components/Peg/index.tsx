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
    <Droppable droppableId={id} ignoreContainerClipping isCombineEnabled>
      {provided => (
        <div ref={provided.innerRef} className={styles.container} style={{backgroundColor}}>
          {provided.placeholder}
          <div className={styles['disc-container']}>{props.children}</div>
        </div>
      )}
    </Droppable>
  );
};
