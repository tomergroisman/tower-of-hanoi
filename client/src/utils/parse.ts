export const capitalizeFirstLetter = (str: string) => {
  return str
    .split(' ')
    .map(str => str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase())
    .join(' ');
};
