import {
  CharacterSearchResponse,
  SearchResponse,
} from '../model/types-star-wars';

export const testDataJane: CharacterSearchResponse = {
  birth_year: '1888',
  eye_color: 'Blue',
  gender: 'woman',
  hair_color: 'Orange',
  height: '188',
  mass: '60',
  name: 'Jane Dow',
  skin_color: 'White',
};

export const testDataJohn: CharacterSearchResponse = {
  birth_year: '1888',
  eye_color: 'Black',
  gender: 'man',
  hair_color: 'Black',
  height: '188',
  mass: '70',
  name: 'John Dow',
  skin_color: 'Black',
};

export const partialTestData: CharacterSearchResponse = {
  name: 'N/A',
};

export const testPeopleSearchArray: CharacterSearchResponse[] = [
  testDataJane,
  testDataJohn,
];

export const testCharactersSearchArray: SearchResponse = {
  results: [testDataJane, testDataJane],
};

export const testCharactersSearch: SearchResponse = {
  results: [testDataJane],
};

export const partialTestSearchResponse: SearchResponse = {
  results: [partialTestData],
};
