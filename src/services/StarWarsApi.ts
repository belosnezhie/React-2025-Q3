import { SearchResp } from '../model/TypesStarWars';

export const getDefaultData = async (page: number, query: string) => {
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
