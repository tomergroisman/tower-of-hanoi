import * as _ from 'lodash';

import {Difficulty} from '../store/types/game';
import {Record} from './api/interfaces/Record';

const NUM_DIFFICULTIES = _.keys(Difficulty).length / 2;

export function padBestRecordsWithUndefined(bestRecords: Record[]) {
  const paddedBestRecords: (Record | undefined)[] = _.fill(Array(NUM_DIFFICULTIES), undefined);
  bestRecords.forEach(record => {
    const index = record.level - 1;
    paddedBestRecords[index] = record;
  });

  return paddedBestRecords;
}
