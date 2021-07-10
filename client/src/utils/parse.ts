export const getFinishTime = (start: number, finish: number) => {
  const seconds = Math.abs((finish - start) / 1000);
  const minutes = Math.floor(seconds / 60);
  const minutesInSeconds = 60 * minutes;
  if (seconds < 60) {
    return `${seconds.toFixed(1)} seconds`;
  } else if (minutes < 2) {
    return `${minutes} minute and ${(seconds - minutesInSeconds).toFixed(1)} seconds`;
  } else {
    return `${minutes} minutes and ${(seconds - minutesInSeconds).toFixed(1)} seconds`;
  }
};

export const timerToString = (timer: number) => {
  const minutes = Math.floor(timer / 60);
  const minutesInSeconds = 60 * minutes;
  return `${minutes.toString().padStart(2, '0')}:${(timer - minutesInSeconds)
    .toString()
    .padStart(2, '0')}`;
};
