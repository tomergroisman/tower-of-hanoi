import {useCallback, useEffect} from 'react';
import {DropResult} from 'react-beautiful-dnd';
import {TFunction} from 'i18next';
import {Dispatch} from 'redux';

import {endGame, moveDisc} from '../../../../store/actions/game';
import {getFinishTime as getFinishTimeRaw} from '../../../../utils/parse';

import {Props} from '.';

export const useHooks = (props: Props, t: TFunction, dispatch: Dispatch) => {
  const onDragEnd = ({source, destination}: DropResult) => {
    if (destination) {
      dispatch(moveDisc(source.droppableId, destination.droppableId, props.board));
    }
  };

  const getFinishTime = () => {
    // @ts-ignore
    const {seconds, minutes, hours} = getFinishTimeRaw(props.finishTime, props.startTime);
    let message = [];
    if (!!hours) {
      if (hours > 1) {
        message.push(t('TIME_HOURS', {hours}));
      } else {
        message.push(t('TIME_HOUR'));
      }
    }
    if (!!minutes) {
      if (minutes > 1) {
        message.push(t('TIME_MINUTES', {minutes}));
      } else {
        message.push(t('TIME_MINUTE'));
      }
    }
    if (!!seconds) {
      if (seconds > 1) {
        message.push(t('TIME_SECONDS', {seconds}));
      } else {
        message.push(t('TIME_SECOND'));
      }
    }
    let last = '';
    if (message.length > 1) {
      last = t('GAME_FINISH_MESSAGE_AND') + message.pop();
    }
    return message.join(', ') + last;
  };

  const getBestRecord = useCallback(() => {
    const bestRecord = props.bestRecords?.[props.difficulty];
    if (bestRecord) {
      return {
        time: bestRecord.time,
        moves: bestRecord.moves,
      };
    }
  }, [props.bestRecords, props.difficulty]);

  useEffect(() => {
    for (const key of Object.keys(props.board)) {
      if (key !== `peg-${props.startPeg}` && props.board[key].length === props.discs) {
        dispatch(endGame());
      }
    }
  }, [props.board, props.startPeg, props.discs, dispatch]);

  return {
    onDragEnd,
    getFinishTime,
    getBestRecord,
  };
};
