import { AstroResp } from '../model/Types.tsx';

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
      'https://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=1&pageSize=10';

    const resp: Response = await fetch(defaultUrl);

    if (resp.status !== 200) {
      throw new Error('Request faild!');
    }

    console.log(resp);

    const data: AstroResp = <AstroResp>await resp.json();

    return data.astronomicalObjects;
  }
}

export const apiService = new ApiService();
