import * as _ from 'lodash';

import {Record} from './api/interfaces/Record';
import {NUM_DIFFICULTIES} from './constants';

export function padBestRecordsWithUndefined(bestRecords: Record[]) {
  const paddedBestRecords: (Record | undefined)[] = _.fill(Array(NUM_DIFFICULTIES), undefined);
  bestRecords.forEach(record => {
    const index = record.level - 1;
    paddedBestRecords[index] = record;
  });

  return paddedBestRecords;
}
