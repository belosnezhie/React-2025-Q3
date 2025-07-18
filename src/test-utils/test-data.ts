import { CharacterSearchResp, SearchResp } from '../model/types-star-wars';

export const testDataJane: CharacterSearchResp = {
  name: 'Jane Dow',
  height: '188',
  mass: '60',
  hair_color: 'Orange',
  skin_color: 'White',
  eye_color: 'Blue',
  birth_year: '1888',
  gender: 'woman',
};

export const testDataJohn: CharacterSearchResp = {
  name: 'John Dow',
  height: '188',
  mass: '70',
  hair_color: 'Black',
  skin_color: 'Black',
  eye_color: 'Black',
  birth_year: '1888',
  gender: 'man',
};

export const testDataNA: CharacterSearchResp = {
  name: 'N/A',
};

export const testPeopleSearchArr: CharacterSearchResp[] = [
  testDataJane,
  testDataJohn,
];

export const testCharactersSearchArr: SearchResp = {
  count: 2,
  results: [testDataJane, testDataJane],
};

export const testCharactersSearch: SearchResp = {
  count: 1,
  results: [testDataJane],
};
