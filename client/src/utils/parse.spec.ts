import {getFinishTime, parseDate, timerToString} from './parse';

describe('Parse functions tests', () => {
  it('should return the finish time in seconds', () => {
    const start = 0;
    const finish = 2539;
    const time = {
      seconds: 2,
      minutes: 0,
      hours: 0,
    };
    expect(getFinishTime(start, finish)).toEqual(time);
  });

  it('should return the finish time in minutes (single)', () => {
    const start = 0;
    const finish = 1922539;
    const time = {
      seconds: 2,
      minutes: 32,
      hours: 0,
    };
    expect(getFinishTime(start, finish)).toEqual(time);
  });

  it('should return the finish time in minutes (many)', () => {
    const start = 0;
    const finish = 3922539;
    const time = {
      seconds: 22,
      minutes: 5,
      hours: 1,
    };
    expect(getFinishTime(start, finish)).toEqual(time);
  });

  it('should return timer representation of seconds', () => {
    const timer = 29;
    expect(timerToString(timer)).toEqual('00:00:29');
  });

  it('should return timer representation of minutes', () => {
    const timer = 123;
    expect(timerToString(timer)).toEqual('00:02:03');
  });

  it('should return timer representation of hours', () => {
    const timer = 3723;
    expect(timerToString(timer)).toEqual('01:02:03');
  });

  it('should return viewable date', () => {
    const date = '2021-07-16';
    expect(parseDate(date)).toEqual('16/07/2021');
  });
});
