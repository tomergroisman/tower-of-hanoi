import React, {PropsWithChildren} from 'react';
import {Droppable} from 'react-beautiful-dnd';

import styles from './Peg.module.scss';

interface Props {
  id: string;
  backgroundColor: string;
  startPeg: number;
}

export const Peg = (props: PropsWithChildren<Props>) => {
  const {id} = props;

  return (
    <Droppable droppableId={id} ignoreContainerClipping isCombineEnabled>
      {provided => (
        <div ref={provided.innerRef} className={styles.container}>
          <div className={styles.peg} style={{backgroundImage: `url(img/${id}.png)`}}>
            {provided.placeholder}
            <div className={styles.discContainer}>{props.children}</div>
          </div>
        </div>
      )}
    </Droppable>
  );
};
