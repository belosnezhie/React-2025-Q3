import { SearchResp } from '../model/TypesStarWars';

const BASE_URL = 'https://swapi.py4e.com/api/people';

export class ApiService {
  async getDefaultData(pageNumber: number) {
    const defaultUrl = `${BASE_URL}/?page=${pageNumber}`;

    const resp: Response = await fetch(defaultUrl);

    if (resp.status !== 200) {
      throw new Error('Request faild!');
    }

    const data: SearchResp = <SearchResp>await resp.json();

    return data;
  }

  async getSeachedData(searchQuery: string) {
    const url = `${BASE_URL}/?search=${searchQuery}&format=json`;

    const resp: Response = await fetch(url);

    if (resp.status !== 200) {
      throw new Error('Request faild!');
    }

    const data: SearchResp = <SearchResp>await resp.json();

    return data;
  }
}

export const apiService = new ApiService();
