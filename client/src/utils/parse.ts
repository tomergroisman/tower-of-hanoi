export const capitalizeFirstLetter = (str: string) => {
  return str
    .split(' ')
    .map(str => str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase())
    .join(' ');
};

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
