import { SearchResponse } from '../model/types-star-wars';
import { validateSearchResponse } from '../utils/guards';

const BASE_URL = 'https://swapi.py4e.com/api/people';

const OK_STATUS_CODE = 200;

export class ApiService {
  async getDefaultData(pageNumber: number): Promise<SearchResponse> {
    const defaultUrl = `${BASE_URL}/?page=${pageNumber}`;

    const resp: Response = await fetch(defaultUrl);

    if (resp.status !== OK_STATUS_CODE) {
      throw new Error(`Request faild with code: ${resp.status}`);
    }

    const data: unknown = await resp.json();

    if (!validateSearchResponse(data)) {
      throw new Error('Wrong data.');
    }

    return data;
  }

  async getSeachedData(searchQuery: string): Promise<SearchResponse> {
    const url = `${BASE_URL}/?search=${searchQuery}&format=json`;

    const resp: Response = await fetch(url);

    if (resp.status !== OK_STATUS_CODE) {
      throw new Error(`Request faild with code: ${resp.status}`);
    }

    const data: unknown = await resp.json();

    if (!validateSearchResponse(data)) {
      throw new Error('Wrong data.');
    }

    return data;
  }
}

export const apiService = new ApiService();
