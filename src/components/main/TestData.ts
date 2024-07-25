import { PeopleSearchResp, SearchResp } from '../../model/TypesStarWars';

export const testPeopleSearchResp: PeopleSearchResp = {
  name: 'test',
  height: 'test',
  mass: 'test',
  hair_color: 'test',
  skin_color: 'test',
  eye_color: 'test',
  birth_year: 'test',
  gender: 'test',
};

export const testPeopleSearchArr: PeopleSearchResp[] = [
  testPeopleSearchResp,
  testPeopleSearchResp,
];

export const testCharactersSearchArr: SearchResp = {
  count: 2,
  results: [testPeopleSearchResp, testPeopleSearchResp],
};

export const testCharactersSearch: SearchResp = {
  count: 1,
  results: [testPeopleSearchResp],
};
