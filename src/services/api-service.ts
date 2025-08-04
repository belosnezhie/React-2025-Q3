import {
  CharacterSearchResponse,
  SearchResponse,
} from '@/model/types-star-wars';
import {
  validateCharacterSearchResponse,
  validateSearchResponse,
} from '@/utils/guards';

const BASE_URL = 'https://swapi.py4e.com/api/people';

const OK_STATUS_CODE = 200;

export class ApiService {
  async getDefaultData(
    pageNumber: number,
    searchQuery?: null | string,
  ): Promise<SearchResponse> {
    const defaultUrl =
      searchQuery !== '' && searchQuery !== null
        ? `${BASE_URL}/?search=${searchQuery}&format=json&page=${pageNumber}`
        : `${BASE_URL}/?page=${pageNumber}`;

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

  async getSeachedData(searchID: string): Promise<CharacterSearchResponse> {
    const url = `${BASE_URL}/${searchID}/`;

    const resp: Response = await fetch(url);

    if (resp.status !== OK_STATUS_CODE) {
      throw new Error(`Request faild with code: ${resp.status}`);
    }

    const data: unknown = await resp.json();

    if (!validateCharacterSearchResponse(data)) {
      throw new Error('Wrong data.');
    }

    return data;
  }
}

export const apiService = new ApiService();
