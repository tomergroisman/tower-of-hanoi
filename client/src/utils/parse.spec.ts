import {Difficulty} from '../store/types/game';
import {capitalizeFirstLetter} from './parse';

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
});
