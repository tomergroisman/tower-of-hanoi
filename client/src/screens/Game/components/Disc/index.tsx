import React from 'react';
import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import {Store} from '../../../../store/types/store';
import {BASE_DISC_WIDTH, DISC_COLORS} from '../../../../utils/constants';

import styles from './Disc.module.scss';

interface StateProps {
  isGameInProgress: boolean;
}

interface OwnProps {
  size: number;
  index: number;
  isOnTop: boolean;
}

type Props = StateProps & OwnProps;

const DiscComponent = (props: Props) => {
  const {size, index, isOnTop, isGameInProgress} = props;

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
    <Draggable
      draggableId={`disc-${size}`}
      index={index}
      isDragDisabled={!isGameInProgress || !isOnTop}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          <div
            className={styles.disc}
            style={{backgroundColor: DISC_COLORS[size], width: BASE_DISC_WIDTH * (size + 1)}}
          />
        </div>
      )}
    </Draggable>
  );
};

const mapState = (store: Store) => ({
  isGameInProgress: !store.gameState.finishTime,
});

export const Disc = connect(mapState)(DiscComponent);
