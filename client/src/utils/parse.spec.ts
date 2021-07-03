import {Difficulty} from '../store/types/game';
import {capitalizeFirstLetter, getFinishTime, timerToString} from './parse';

describe('Parse functions tests', () => {
  it('should return Difficulty as string', () => {
    const difficulty = Difficulty[0];
    const difficultyStr = 'Easy';
    expect(capitalizeFirstLetter(difficulty)).toEqual(difficultyStr);
  });

  it('should return capitalized first letter representation of a string', () => {
    const str = 'awesome TEST in tHe WoRlD';
    const capitalizedStr = 'Awesome Test In The World';
    expect(capitalizeFirstLetter(str)).toEqual(capitalizedStr);
  });

  it('should return the finish time in seconds', () => {
    const start = 0;
    const finish = 2539;
    const msg = '2.5 seconds';
    expect(getFinishTime(start, finish)).toEqual(msg);
  });

  it('should return the finish time in minutes (single)', () => {
    const start = 0;
    const finish = 62539;
    const msg = '1 minute and 2.5 seconds';
    expect(getFinishTime(start, finish)).toEqual(msg);
  });

  it('should return the finish time in minutes (many)', () => {
    const start = 0;
    const finish = 1922539;
    const msg = '32 minutes and 2.5 seconds';
    expect(getFinishTime(start, finish)).toEqual(msg);
  });

  it('should return timer representation of seconds', () => {
    const timer = 29;
    expect(timerToString(timer)).toEqual('00:29');
  });

  it('should return timer representation of minutes', () => {
    const timer = 123;
    expect(timerToString(timer)).toEqual('02:03');
  });
});
