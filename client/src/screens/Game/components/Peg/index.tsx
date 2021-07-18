import React, {PropsWithChildren} from 'react';
import {Droppable} from 'react-beautiful-dnd';
import {useGameObjectsStyles} from '../useGameObjectsStyles';

import styles from './Peg.module.scss';

export interface Props {
  id: string;
  startPeg: number;
}

export const Peg = (props: PropsWithChildren<Props>) => {
  const {id} = props;
  const {getContainerStyles, getPegBaseStyles, getPegStyles} = useGameObjectsStyles({pegId: id});

  return (
    <Droppable droppableId={id} ignoreContainerClipping isCombineEnabled>
      {provided => (
        <div ref={provided.innerRef} className={styles.container} style={getContainerStyles()}>
          <div className={styles.peg} style={getPegStyles()}>
            {provided.placeholder}
            <div className={styles.discContainer}>{props.children}</div>
            <div className={styles.base} style={getPegBaseStyles()}></div>
          </div>
        </div>
      )}
    </Droppable>
  );
};
