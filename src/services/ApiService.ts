import { DefaultAstroResr, SingleAstroResp } from '../model/Types.tsx';

export class ApiService {
  // return all
  private baseUrl: string;
  // return searching
  private searchUrl: string;

  constructor() {
    this.baseUrl = 'https://stapi.co/api/v2/rest/astronomicalObject/search';
    this.searchUrl = 'https://stapi.co/api/v2/rest/astronomicalObject';
  }

  async getDefaultData() {
    const defaultUrl =
      'https://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=1&pageSize=1000';

    const resp: Response = await fetch(defaultUrl);

    if (resp.status !== 200) {
      throw new Error('Request faild!');
    }

    const data: DefaultAstroResr = <DefaultAstroResr>await resp.json();

    return data.astronomicalObjects;
  }

  async getSeachedData(searchQuery: string) {
    const url = `http://stapi.co/api/v2/rest/astronomicalObject?uid=${searchQuery}`;

    const resp: Response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    });

    if (resp.status !== 200) {
      throw new Error('Request faild!');
    }

    const data: SingleAstroResp = <SingleAstroResp>await resp.json();

    return data;
  }
}

export const apiService = new ApiService();
