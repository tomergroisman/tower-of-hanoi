const _getTimeFromSeconds = (
  seconds: number
): {
  seconds: number;
  minutes: number;
  hours: number;
} => {
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return {
    seconds,
    minutes,
    hours,
  };
};

const _padNumberWithZeros = (num: number, NumOfZeros: number = 2) => {
  return num.toString().padStart(NumOfZeros, '0');
};

export const getFinishTime = (
  start: number,
  finish: number
): {
  seconds: number;
  minutes: number;
  hours: number;
} => {
  const seconds = Math.floor(Math.abs((finish - start) / 1000));
  return _getTimeFromSeconds(seconds);
};

export const timerToString = (timer: number) => {
  const time = _getTimeFromSeconds(timer);
  const hours = _padNumberWithZeros(time.hours);
  const minutes = _padNumberWithZeros(time.minutes);
  const seconds = _padNumberWithZeros(time.seconds);
  return `${hours}:${minutes}:${seconds}`;
};
