import {
  CharacterSearchResponse,
  SearchResponse,
} from '@/model/types-star-wars';

export const testDataJane: CharacterSearchResponse = {
  birth_year: '1888',
  eye_color: 'Blue',
  gender: 'woman',
  hair_color: 'Orange',
  height: '188',
  mass: '60',
  name: 'Jane Dow',
  skin_color: 'White',
  url: 'http://localhost',
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
  url: 'http://localhost',
};

export const partialTestData: CharacterSearchResponse = {
  name: 'N/A',
  url: 'http://localhost',
};

export const testPeopleSearchArray: CharacterSearchResponse[] = [
  testDataJane,
  testDataJohn,
];

export const testCharactersSearchArray: SearchResponse = {
  count: 2,
  results: [testDataJane, testDataJane],
};

export const testCharactersSearch: CharacterSearchResponse = testDataJane;

export const partialTestSearchResponse: SearchResponse = {
  count: 1,
  results: [partialTestData],
};
