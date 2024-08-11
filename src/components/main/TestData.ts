import { PageProps, Params } from '../../app/page';
import { PeopleSearchResp, SearchResp } from '../../model/TypesStarWars';

export const testDataJane: PeopleSearchResp = {
  name: 'Jane Dow',
  height: 'test',
  mass: 'test',
  hair_color: 'test',
  skin_color: 'test',
  eye_color: 'test',
  birth_year: 'test',
  gender: 'test',
};

export const testDataJohn: PeopleSearchResp = {
  name: 'John Dow',
  height: 'test',
  mass: 'test',
  hair_color: 'test',
  skin_color: 'test',
  eye_color: 'test',
  birth_year: 'test',
  gender: 'test',
};

export const testPeopleSearchArr: PeopleSearchResp[] = [
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

const testParams: Params = {
  slug: 'test',
};

const testSearchParams = {
  ['test']: 'test',
};

export const testPageProps: PageProps = {
  params: testParams,
  searchParams: testSearchParams,
};
