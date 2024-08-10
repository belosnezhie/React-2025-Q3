import { SearchResp } from '../../model/TypesStarWars';
import { SearchParams } from '../page';

export const getDefaultData = async (searchParams: SearchParams) => {
  const page = searchParams.page ? searchParams.page[0] : 1;

  let query;

  query = searchParams.search ? searchParams.search : '';

  if (Array.isArray(query)) {
    query = query.join('');
  }

  const resp = await fetch(
    `https://swapi.dev/api/people/?page=${page}&search=${query}`,
  );

  if (resp.status !== 200) {
    throw new Error('Request faild!');
  }

  const data: SearchResp = <SearchResp>await resp.json();

  return data;
};

export const getSearchedData = async (query: string) => {
  const resp = await fetch(`https://swapi.dev/api/people/?&search=${query}`);

  if (resp.status !== 200) {
    throw new Error('Request faild!');
  }

  const data: SearchResp = <SearchResp>await resp.json();

  return data;
};
